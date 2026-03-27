import { Link } from 'react-router-dom';
import { Leaf, LogOut } from 'lucide-react';
import { useAuth } from '@/features/auth/hooks/useAuth';

export const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md transition-all">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        
        <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary">
          <Leaf className="h-6 w-6" />
          <span>RedDonación</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <a href="/#como-funciona" className="hover:text-primary transition-colors">Cómo Funciona</a>
          <a href="/#impacto" className="hover:text-primary transition-colors">Impacto</a>
        </div>
        
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
        </div>

      </div>
    </nav>
  );
};
