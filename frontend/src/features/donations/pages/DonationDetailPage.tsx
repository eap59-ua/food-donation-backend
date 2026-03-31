import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { donationsApi } from '../api/donations';
import { requestsApi } from '@/features/requests/api/requests';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { MapPin, Clock, Package, ArrowLeft, Loader2, AlertCircle, Pencil, CheckCircle, Send } from 'lucide-react';
import { useState } from 'react';

const statusLabels: Record<string, { label: string; color: string }> = {
    AVAILABLE: { label: 'Disponible', color: 'bg-blue-100 text-blue-800' },
    RESERVED: { label: 'Reservada', color: 'bg-indigo-100 text-indigo-800' },
    COMPLETED: { label: 'Completada', color: 'bg-violet-100 text-violet-800' },
    EXPIRED: { label: 'Expirada', color: 'bg-purple-100 text-purple-800' },
};

export const DonationDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    const queryClient = useQueryClient();

    const [message, setMessage] = useState('');
    const [requestedQuantity, setRequestedQuantity] = useState('');
    const [showRequestForm, setShowRequestForm] = useState(false);

    const { data: donation, isLoading, isError } = useQuery({
        queryKey: ['donation', id],
        queryFn: () => donationsApi.getById(id!),
        enabled: !!id,
    });

    const requestMutation = useMutation({
        mutationFn: () =>
            requestsApi.create({
                donation_id: id!,
                message: message || undefined,
                requested_quantity: requestedQuantity || undefined,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['donation', id] });
            setShowRequestForm(false);
            setMessage('');
            setRequestedQuantity('');
            navigate('/requests');
        },
    });

    const statusMutation = useMutation({
        mutationFn: (status: string) => donationsApi.updateStatus(id!, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['donation', id] });
        },
    });

    if (isLoading) {
        return (
            <div className="min-h-screen pt-24 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (isError || !donation) {
        return (
            <div className="min-h-screen pt-24 flex flex-col items-center justify-center gap-4">
                <AlertCircle className="h-12 w-12 text-destructive" />
                <h2 className="text-xl font-semibold">Donación no encontrada</h2>
                <Link to="/donations" className="text-primary font-medium hover:underline">
                    Volver a donaciones
                </Link>
            </div>
        );
    }

    const statusInfo = statusLabels[donation.status] ?? { label: donation.status, color: 'bg-slate-100 text-slate-800' };
    const isOwner = user?.sub === donation.donor_id;
    const canRequest =
        isAuthenticated &&
        !isOwner &&
        donation.status === 'AVAILABLE' &&
        (user?.role === 'RECEPTOR' || user?.role === 'ONG' || user?.role === 'ADMIN');

    return (
        <div className="min-h-screen pt-24 pb-12 bg-muted/20">
            <div className="container mx-auto px-6 max-w-3xl">
                {/* Back link */}
                <Link
                    to="/donations"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Volver a donaciones
                </Link>

                {/* Card */}
                <div className="bg-background rounded-2xl border border-border p-8">
                    <div className="flex items-start justify-between mb-6">
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">{donation.title}</h1>
                        <span className={`text-xs font-semibold px-3 py-1.5 rounded-full shrink-0 ml-3 ${statusInfo.color}`}>
                            {statusInfo.label}
                        </span>
                    </div>

                    {donation.description && (
                        <p className="text-muted-foreground mb-6 leading-relaxed">{donation.description}</p>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl">
                            <Package className="h-5 w-5 text-primary" />
                            <div>
                                <p className="text-xs text-muted-foreground font-medium">Cantidad</p>
                                <p className="font-semibold text-foreground">{donation.quantity}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl">
                            <MapPin className="h-5 w-5 text-primary" />
                            <div>
                                <p className="text-xs text-muted-foreground font-medium">Ubicación</p>
                                <p className="font-semibold text-foreground">{donation.location_address}</p>
                            </div>
                        </div>
                        {donation.expiration_date && (
                            <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl">
                                <Clock className="h-5 w-5 text-primary" />
                                <div>
                                    <p className="text-xs text-muted-foreground font-medium">Fecha de caducidad</p>
                                    <p className="font-semibold text-foreground">
                                        {new Date(donation.expiration_date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </p>
                                </div>
                            </div>
                        )}
                        <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl">
                            <Clock className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-xs text-muted-foreground font-medium">Publicada</p>
                                <p className="font-semibold text-foreground">
                                    {new Date(donation.created_at).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3">
                        {isOwner && (
                            <>
                                <Link
                                    to={`/donations/${donation.id}/edit`}
                                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity"
                                >
                                    <Pencil className="h-4 w-4" />
                                    Editar
                                </Link>
                                {donation.status === 'RESERVED' && (
                                    <button
                                        onClick={() => statusMutation.mutate('COMPLETED')}
                                        disabled={statusMutation.isPending}
                                        className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-5 py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                                    >
                                        <CheckCircle className="h-4 w-4" />
                                        Marcar como Completada
                                    </button>
                                )}
                            </>
                        )}

                        {canRequest && !showRequestForm && (
                            <button
                                onClick={() => setShowRequestForm(true)}
                                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity"
                            >
                                <Send className="h-4 w-4" />
                                Solicitar esta donación
                            </button>
                        )}
                    </div>

                    {/* Request Form */}
                    {showRequestForm && (
                        <div className="mt-6 p-6 bg-muted/20 rounded-xl border border-border">
                            <h3 className="text-lg font-semibold text-foreground mb-4">Solicitar Donación</h3>

                            {requestMutation.isError && (
                                <div className="mb-4 bg-destructive/10 text-destructive text-sm font-medium p-3 rounded-lg flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4 shrink-0" />
                                    <span>Error al enviar la solicitud. Puede que ya tengas una pendiente.</span>
                                </div>
                            )}

                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-semibold text-foreground block mb-1">Cantidad solicitada (opcional)</label>
                                    <input
                                        type="text"
                                        value={requestedQuantity}
                                        onChange={(e) => setRequestedQuantity(e.target.value)}
                                        placeholder="Ej: 5 kg, 10 unidades..."
                                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-foreground block mb-1">Mensaje (opcional)</label>
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Cuéntanos por qué necesitas esta donación..."
                                        rows={3}
                                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground resize-none"
                                    />
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => requestMutation.mutate()}
                                        disabled={requestMutation.isPending}
                                        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                                    >
                                        {requestMutation.isPending ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <Send className="h-4 w-4" />
                                        )}
                                        Enviar Solicitud
                                    </button>
                                    <button
                                        onClick={() => setShowRequestForm(false)}
                                        className="px-5 py-2.5 rounded-lg font-medium border border-border hover:bg-muted/50 transition-all"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
