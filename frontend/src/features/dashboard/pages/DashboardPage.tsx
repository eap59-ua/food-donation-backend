import { Link } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Package, Search, ClipboardList, PlusCircle, ArrowRight } from 'lucide-react';

export const DashboardPage = () => {
    const { user } = useAuth();
    const role = user?.role;

    return (
        <div className="min-h-screen pt-24 pb-12 bg-muted/20">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">
                        Panel de Control
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Bienvenido de nuevo. Tu rol: <span className="font-semibold text-primary">{role}</span>
                    </p>
                </div>

                {/* Quick Actions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* Explorar Donaciones — all roles */}
                    <Link
                        to="/donations"
                        className="group p-6 bg-background rounded-2xl border border-border hover:border-primary/30 hover:shadow-md transition-all"
                    >
                        <div className="p-3 rounded-xl bg-secondary/10 text-secondary w-fit mb-4 group-hover:scale-110 transition-transform">
                            <Search className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-1">Explorar Donaciones</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Descubre alimentos disponibles cerca de ti
                        </p>
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                            Ver donaciones <ArrowRight className="h-4 w-4" />
                        </span>
                    </Link>

                    {/* Crear Donación — DONANTE/ADMIN */}
                    {(role === 'DONANTE' || role === 'ADMIN') && (
                        <Link
                            to="/donations/new"
                            className="group p-6 bg-background rounded-2xl border border-border hover:border-primary/30 hover:shadow-md transition-all"
                        >
                            <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-4 group-hover:scale-110 transition-transform">
                                <PlusCircle className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-semibold text-foreground mb-1">Nueva Donación</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Publica un excedente de alimentos para donar
                            </p>
                            <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                                Crear donación <ArrowRight className="h-4 w-4" />
                            </span>
                        </Link>
                    )}

                    {/* Mis Donaciones — DONANTE/ADMIN */}
                    {(role === 'DONANTE' || role === 'ADMIN') && (
                        <Link
                            to="/donations?mine=true"
                            className="group p-6 bg-background rounded-2xl border border-border hover:border-primary/30 hover:shadow-md transition-all"
                        >
                            <div className="p-3 rounded-xl bg-accent/10 text-accent w-fit mb-4 group-hover:scale-110 transition-transform">
                                <Package className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-semibold text-foreground mb-1">Mis Donaciones</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Gestiona y revisa tus publicaciones activas
                            </p>
                            <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                                Ver mis donaciones <ArrowRight className="h-4 w-4" />
                            </span>
                        </Link>
                    )}

                    {/* Solicitudes — all authenticated */}
                    <Link
                        to="/requests"
                        className="group p-6 bg-background rounded-2xl border border-border hover:border-primary/30 hover:shadow-md transition-all"
                    >
                        <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-4 group-hover:scale-110 transition-transform">
                            <ClipboardList className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-1">Mis Solicitudes</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            {role === 'DONANTE'
                                ? 'Revisa y gestiona las solicitudes recibidas'
                                : 'Consulta el estado de tus solicitudes'}
                        </p>
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                            Ver solicitudes <ArrowRight className="h-4 w-4" />
                        </span>
                    </Link>

                </div>
            </div>
        </div>
    );
};
