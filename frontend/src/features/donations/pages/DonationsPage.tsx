import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { donationsApi, type DonationResponseDTO } from '../api/donations';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { MapPin, Clock, PlusCircle, Loader2, Package, Search } from 'lucide-react';
import { useState } from 'react';

const statusLabels: Record<string, { label: string; color: string }> = {
    AVAILABLE: { label: 'Disponible', color: 'bg-blue-100 text-blue-800' },
    RESERVED: { label: 'Reservada', color: 'bg-indigo-100 text-indigo-800' },
    COMPLETED: { label: 'Completada', color: 'bg-violet-100 text-violet-800' },
    EXPIRED: { label: 'Expirada', color: 'bg-purple-100 text-purple-800' },
};

export const DonationsPage = () => {
    const { user } = useAuth();
    const [statusFilter, setStatusFilter] = useState<string>('');
    const [locationFilter, setLocationFilter] = useState<string>('');

    const { data: donations, isLoading } = useQuery<DonationResponseDTO[]>({
        queryKey: ['donations', statusFilter, locationFilter],
        queryFn: () => donationsApi.list(statusFilter || undefined, locationFilter || undefined),
    });

    const canCreate = user?.role === 'DONANTE' || user?.role === 'ADMIN';

    return (
        <div className="min-h-screen pt-24 pb-12 bg-muted/20">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight text-foreground">Donaciones</h1>
                        <p className="text-muted-foreground mt-1">Explora los alimentos disponibles para solicitar</p>
                    </div>
                    {canCreate && (
                        <Link
                            to="/donations/new"
                            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-medium shadow-sm hover:opacity-90 transition-opacity self-start"
                        >
                            <PlusCircle className="h-4 w-4" />
                            Nueva Donación
                        </Link>
                    )}
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8 p-4 bg-background rounded-xl border border-border">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Filtrar por ubicación..."
                            value={locationFilter}
                            onChange={(e) => setLocationFilter(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    >
                        <option value="">Todos los estados</option>
                        <option value="AVAILABLE">Disponible</option>
                        <option value="RESERVED">Reservada</option>
                        <option value="COMPLETED">Completada</option>
                        <option value="EXPIRED">Expirada</option>
                    </select>
                </div>

                {/* Content */}
                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : !donations?.length ? (
                    <div className="text-center py-20">
                        <Package className="h-16 w-16 text-muted-foreground/40 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-foreground mb-2">No hay donaciones</h3>
                        <p className="text-muted-foreground mb-6">
                            {canCreate
                                ? 'Sé el primero en publicar una donación de alimentos.'
                                : 'Aún no hay donaciones disponibles. Vuelve pronto.'}
                        </p>
                        {canCreate && (
                            <Link
                                to="/donations/new"
                                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-medium"
                            >
                                <PlusCircle className="h-4 w-4" />
                                Crear primera donación
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {donations.map((donation) => {
                            const statusInfo = statusLabels[donation.status] ?? { label: donation.status, color: 'bg-slate-100 text-slate-800' };
                            return (
                                <Link
                                    key={donation.id}
                                    to={`/donations/${donation.id}`}
                                    className="group bg-background rounded-2xl border border-border hover:border-primary/30 hover:shadow-md transition-all overflow-hidden"
                                >
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-3">
                                            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                                {donation.title}
                                            </h3>
                                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ml-2 ${statusInfo.color}`}>
                                                {statusInfo.label}
                                            </span>
                                        </div>
                                        {donation.description && (
                                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                                {donation.description}
                                            </p>
                                        )}
                                        <div className="space-y-2 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-2">
                                                <Package className="h-4 w-4 shrink-0" />
                                                <span className="font-medium">Cantidad:</span> {donation.quantity}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4 shrink-0" />
                                                <span className="line-clamp-1">{donation.location_address}</span>
                                            </div>
                                            {donation.expiration_date && (
                                                <div className="flex items-center gap-2">
                                                    <Clock className="h-4 w-4 shrink-0" />
                                                    <span>Caduca: {new Date(donation.expiration_date).toLocaleDateString('es-ES')}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};
