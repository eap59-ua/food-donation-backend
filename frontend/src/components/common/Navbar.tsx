import { Link, useNavigate } from 'react-router-dom';
import { Leaf, LogOut, Menu, X, User, LayoutDashboard, Heart, Gift } from 'lucide-react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useState } from 'react';

export const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isDonor = user?.role === 'donor';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur-md transition-all">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary hover:text-primary/80 transition-colors">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Leaf className="h-6 w-6" />
          </div>
          <span className="hidden sm:inline">RedDonación</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {isAuthenticated && (
            <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
              <Link to="/donations" className="hover:text-primary transition-colors flex items-center gap-1">
                <Gift className="h-4 w-4" />
                Donaciones
              </Link>
              <Link to="/requests" className="hover:text-primary transition-colors flex items-center gap-1">
                <Heart className="h-4 w-4" />
                Solicitudes
              </Link>
            </div>
          )}

          {!isAuthenticated && (
            <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
              <a href="/#como-funciona" className="hover:text-primary transition-colors">Cómo Funciona</a>
              <a href="/#impacto" className="hover:text-primary transition-colors">Impacto</a>
            </div>
          )}
        </div>
        
        {/* Auth Section */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link 
                to="/dashboard" 
                className="inline-flex items-center gap-2 text-sm font-medium bg-primary/10 text-primary px-4 py-2 rounded-lg hover:bg-primary/20 transition-all"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <Link 
                to="/profile" 
                className="inline-flex items-center gap-2 text-sm font-medium bg-secondary/10 text-secondary-foreground px-4 py-2 rounded-lg hover:bg-secondary/20 transition-all"
              >
                <User className="h-4 w-4" />
                Perfil
              </Link>
              <button 
                onClick={handleLogout}
                className="inline-flex items-center gap-2 bg-destructive/10 text-destructive text-sm font-medium border border-destructive/20 px-4 py-2 rounded-lg hover:bg-destructive/20 transition-all"
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
              <Link to="/register" className="bg-primary text-primary-foreground text-sm font-medium px-4 py-2 rounded-lg shadow-sm hover:bg-primary/90 transition-all">
                Únete ahora
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
        >
          {isOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border/40 bg-background p-4 space-y-3">
          {isAuthenticated ? (
            <>
              <Link 
                to="/dashboard" 
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                Dashboard
              </Link>
              <Link 
                to="/donations" 
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                Donaciones
              </Link>
              <Link 
                to="/requests" 
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                Solicitudes
              </Link>
              <Link 
                to="/profile" 
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                Perfil
              </Link>
              <button 
                onClick={() => { handleLogout(); setIsOpen(false); }}
                className="w-full text-left px-4 py-2 text-sm font-medium text-destructive hover:bg-muted rounded-lg transition-colors"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <a 
                href="/#como-funciona" 
                className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                Cómo Funciona
              </a>
              <a 
                href="/#impacto" 
                className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                Impacto
              </a>
              <Link 
                to="/login" 
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                Acceder
              </Link>
              <Link 
                to="/register" 
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all text-center"
              >
                Únete ahora
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};
