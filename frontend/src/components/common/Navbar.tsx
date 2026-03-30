import { Link } from 'react-router-dom';
import { Leaf, LogOut, LayoutDashboard, Package, ClipboardList, PlusCircle, Menu, X } from 'lucide-react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useState } from 'react';

export const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const canCreate = user?.role === 'DONANTE' || user?.role === 'ADMIN';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md transition-all">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">

        <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary">
          <Leaf className="h-6 w-6" />
          <span>RedDonación</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="inline-flex items-center gap-1.5 hover:text-primary transition-colors">
                <LayoutDashboard className="h-4 w-4" /> Panel
              </Link>
              <Link to="/donations" className="inline-flex items-center gap-1.5 hover:text-primary transition-colors">
                <Package className="h-4 w-4" /> Donaciones
              </Link>
              {canCreate && (
                <Link to="/donations/new" className="inline-flex items-center gap-1.5 hover:text-primary transition-colors">
                  <PlusCircle className="h-4 w-4" /> Nueva
                </Link>
              )}
              <Link to="/requests" className="inline-flex items-center gap-1.5 hover:text-primary transition-colors">
                <ClipboardList className="h-4 w-4" /> Solicitudes
              </Link>
            </>
          ) : (
            <>
              <a href="/#como-funciona" className="hover:text-primary transition-colors">Cómo Funciona</a>
              <a href="/#impacto" className="hover:text-primary transition-colors">Impacto</a>
            </>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-xs font-semibold text-muted-foreground uppercase">{user?.role}</span>
              </div>
              <button
                onClick={() => logout()}
                className="inline-flex items-center gap-2 bg-secondary/10 text-secondary-foreground text-sm font-medium border border-secondary/20 px-4 py-2 rounded-md hover:bg-secondary/20 transition-all"
              >
                Cerrar Sesión
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium hover:text-primary transition-colors">
                Acceder
              </Link>
              <Link to="/register" className="bg-primary text-primary-foreground text-sm font-medium px-4 py-2 rounded-md shadow-sm hover:opacity-90 transition-opacity">
                Únete ahora
              </Link>
            </>
          )}

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      </div>

      {/* Mobile menu */}
      {mobileOpen && isAuthenticated && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-md px-6 py-4 space-y-3">
          <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary py-2 transition-colors">
            <LayoutDashboard className="h-4 w-4" /> Panel
          </Link>
          <Link to="/donations" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary py-2 transition-colors">
            <Package className="h-4 w-4" /> Donaciones
          </Link>
          {canCreate && (
            <Link to="/donations/new" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary py-2 transition-colors">
              <PlusCircle className="h-4 w-4" /> Nueva Donación
            </Link>
          )}
          <Link to="/requests" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary py-2 transition-colors">
            <ClipboardList className="h-4 w-4" /> Solicitudes
          </Link>
        </div>
      )}
    </nav>
  );
};
