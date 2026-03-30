import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { requestsApi, type RequestResponseDTO } from '../api/requests';
import { donationsApi, type DonationResponseDTO } from '@/features/donations/api/donations';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Loader2, ClipboardList, CheckCircle, XCircle, Clock, MessageSquare, Package } from 'lucide-react';
import { useEffect, useState } from 'react';

const statusLabels: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
    PENDING: { label: 'Pendiente', color: 'bg-yellow-100 text-yellow-800', icon: <Clock className="h-3.5 w-3.5" /> },
    APPROVED: { label: 'Aprobada', color: 'bg-green-100 text-green-800', icon: <CheckCircle className="h-3.5 w-3.5" /> },
    REJECTED: { label: 'Rechazada', color: 'bg-red-100 text-red-800', icon: <XCircle className="h-3.5 w-3.5" /> },
};

export const MyRequestsPage = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const isDonor = user?.role === 'DONANTE';

    const { data: requests, isLoading } = useQuery<RequestResponseDTO[]>({
        queryKey: ['my-requests'],
        queryFn: requestsApi.getMyRequests,
    });

    // Fetch donation titles for each unique donation_id
    const [donationMap, setDonationMap] = useState<Record<string, DonationResponseDTO>>({});

    useEffect(() => {
        if (!requests?.length) return;
        const uniqueIds = [...new Set(requests.map((r) => r.donation_id))];
        Promise.all(uniqueIds.map((id) => donationsApi.getById(id).catch(() => null))).then((results) => {
            const map: Record<string, DonationResponseDTO> = {};
            results.forEach((d) => {
                if (d) map[d.id] = d;
            });
            setDonationMap(map);
        });
    }, [requests]);

    const statusMutation = useMutation({
        mutationFn: ({ requestId, status }: { requestId: string; status: 'APPROVED' | 'REJECTED' }) =>
            requestsApi.updateStatus(requestId, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my-requests'] });
        },
    });

    return (
        <div className="min-h-screen pt-24 pb-12 bg-muted/20">
            <div className="container mx-auto px-6 max-w-4xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold tracking-tight text-foreground">Mis Solicitudes</h1>
                    <p className="text-muted-foreground mt-1">
                        {isDonor
                            ? 'Gestiona las solicitudes recibidas en tus donaciones'
                            : 'Consulta el estado de tus solicitudes enviadas'}
                    </p>
                </div>

                {/* Content */}
                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : !requests?.length ? (
                    <div className="text-center py-20">
                        <ClipboardList className="h-16 w-16 text-muted-foreground/40 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-foreground mb-2">Sin solicitudes</h3>
                        <p className="text-muted-foreground">
                            {isDonor
                                ? 'Aún no has recibido ninguna solicitud sobre tus donaciones.'
                                : 'No has enviado ninguna solicitud todavía. Explora las donaciones disponibles.'}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {requests.map((req) => {
                            const statusInfo = statusLabels[req.status] ?? { label: req.status, color: 'bg-gray-100 text-gray-800', icon: null };
                            const donation = donationMap[req.donation_id];

                            return (
                                <div
                                    key={req.id}
                                    className="bg-background rounded-xl border border-border p-6 hover:shadow-sm transition-all"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                        <div className="flex-1 min-w-0">
                                            {/* Donation title */}
                                            <h3 className="text-lg font-semibold text-foreground mb-1 truncate">
                                                {donation?.title ?? 'Donación'}
                                            </h3>

                                            {/* Request meta */}
                                            <div className="space-y-1.5 text-sm text-muted-foreground">
                                                {req.requested_quantity && (
                                                    <div className="flex items-center gap-2">
                                                        <Package className="h-4 w-4 shrink-0" />
                                                        <span>Cantidad: {req.requested_quantity}</span>
                                                    </div>
                                                )}
                                                {req.message && (
                                                    <div className="flex items-start gap-2">
                                                        <MessageSquare className="h-4 w-4 shrink-0 mt-0.5" />
                                                        <span className="line-clamp-2">{req.message}</span>
                                                    </div>
                                                )}
                                                <div className="flex items-center gap-2">
                                                    <Clock className="h-4 w-4 shrink-0" />
                                                    <span>{new Date(req.created_at).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-end gap-3">
                                            {/* Status badge */}
                                            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${statusInfo.color}`}>
                                                {statusInfo.icon}
                                                {statusInfo.label}
                                            </span>

                                            {/* Donor actions */}
                                            {isDonor && req.status === 'PENDING' && (
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => statusMutation.mutate({ requestId: req.id, status: 'APPROVED' })}
                                                        disabled={statusMutation.isPending}
                                                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors disabled:opacity-50"
                                                    >
                                                        <CheckCircle className="h-3.5 w-3.5" />
                                                        Aprobar
                                                    </button>
                                                    <button
                                                        onClick={() => statusMutation.mutate({ requestId: req.id, status: 'REJECTED' })}
                                                        disabled={statusMutation.isPending}
                                                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50"
                                                    >
                                                        <XCircle className="h-3.5 w-3.5" />
                                                        Rechazar
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};
