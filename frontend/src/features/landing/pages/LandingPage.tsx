import { ArrowRight, HeartPulse, Handshake, Package, Utensils, Users, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LandingPage = () => {
  return (
    <div className="pt-16 min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      
      {/* HERO SECTION */}
      <header className="relative pt-24 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1] mb-6 text-foreground">
              Rescatar comida. <br />
              <span className="text-primary">Nutrir comunidades.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
              Conectamos rápidamente excedentes alimentarios de empresas con las organizaciones que más lo necesitan, reduciendo el desperdicio y multiplicando el impacto social.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 rounded-lg font-medium shadow-sm hover:translate-y-[-2px] hover:shadow-md transition-all active:scale-95">
                Quiero Donar
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/register" className="inline-flex items-center justify-center bg-secondary/10 text-secondary-foreground border border-secondary/20 px-6 py-3.5 rounded-lg font-medium hover:bg-secondary/20 transition-all active:scale-95">
                Soy una Organización
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ESTADÍSTICAS SIMULADAS */}
      <section id="impacto" className="container mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 md:p-12 rounded-2xl bg-secondary/5 border border-secondary/10">
          <div className="flex flex-col gap-2">
            <Utensils className="h-8 w-8 text-secondary mb-2" />
            <h3 className="text-4xl font-bold text-foreground">+1,200</h3>
            <p className="text-muted-foreground font-medium">Kilos Salvados este Mes</p>
          </div>
          <div className="flex flex-col gap-2">
            <HeartPulse className="h-8 w-8 text-primary mb-2" />
            <h3 className="text-4xl font-bold text-foreground">15</h3>
            <p className="text-muted-foreground font-medium">ONGs Registradas</p>
          </div>
          <div className="flex flex-col gap-2">
            <Users className="h-8 w-8 text-foreground mb-2" />
            <h3 className="text-4xl font-bold text-foreground">340</h3>
            <p className="text-muted-foreground font-medium">Familias Ayudadas</p>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section id="como-funciona" className="bg-muted/30 py-24 border-y border-border/40">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">Un proceso simple y transparente</h2>
            <p className="text-muted-foreground text-lg">
              Nuestra plataforma automatiza la logística solidaria para que la ayuda llegue donde se necesita, en tiempo real.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Paso 1 */}
            <div className="flex flex-col items-start gap-4 p-6 rounded-2xl hover:bg-background hover:shadow-sm transition-all border border-transparent hover:border-border/50 group">
              <div className="p-4 rounded-full bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <Package className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">1. Publica el excedente</h3>
              <p className="text-muted-foreground leading-relaxed">
                Los restaurantes y supermercados registran sus alimentos disponibles, indicando cantidad y caducidad de forma sencilla.
              </p>
            </div>
            {/* Paso 2 */}
            <div className="flex flex-col items-start gap-4 p-6 rounded-2xl hover:bg-background hover:shadow-sm transition-all border border-transparent hover:border-border/50 group">
              <div className="p-4 rounded-full bg-secondary/15 text-secondary group-hover:scale-110 group-hover:bg-secondary group-hover:text-secondary-foreground transition-all duration-300">
                <Handshake className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">2. Smart Match</h3>
              <p className="text-muted-foreground leading-relaxed">
                El sistema notifica intantáneamente a las organizaciones certificadas cercanas que necesitan exactamente ese tipo de donación.
              </p>
            </div>
            {/* Paso 3 */}
            <div className="flex flex-col items-start gap-4 p-6 rounded-2xl hover:bg-background hover:shadow-sm transition-all border border-transparent hover:border-border/50 group">
              <div className="p-4 rounded-full bg-accent/10 text-accent group-hover:scale-110 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                <HeartPulse className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">3. Recolección</h3>
              <p className="text-muted-foreground leading-relaxed">
                La organización acude a recogerla de forma local. Todo queda trazado para generar reportes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-background py-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 font-semibold text-foreground opacity-80">
            <Leaf className="h-5 w-5 text-primary" />
            <span>RedDonación</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Red de Donación de Alimentos. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};
