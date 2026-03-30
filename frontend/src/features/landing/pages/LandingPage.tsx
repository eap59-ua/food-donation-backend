import { ArrowRight, HeartPulse, Handshake, Package, Utensils, Users, Leaf, Zap, TrendingUp, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LandingPage = () => {
  return (
    <div className="pt-16 min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      
      {/* HERO SECTION */}
      <header className="relative pt-24 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/15 via-background to-background"></div>
        <div className="absolute inset-0 -z-10 opacity-40 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-secondary/10 via-transparent to-transparent"></div>
        
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Bienvenido a RedDonación</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1] mb-6 text-foreground">
              Rescatar comida. <br />
              <span className="text-primary">Nutrir comunidades.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
              Conectamos rápidamente excedentes alimentarios de empresas con las organizaciones que más lo necesitan, reduciendo el desperdicio y multiplicando el impacto social.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all active:scale-95">
                Quiero Donar
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/register" className="inline-flex items-center justify-center bg-secondary/10 text-secondary-foreground border border-secondary/20 px-8 py-4 rounded-lg font-semibold hover:bg-secondary/20 transition-all active:scale-95">
                Soy una Organización
                <Handshake className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ESTADÍSTICAS */}
      <section id="impacto" className="container mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-8 md:p-12 rounded-2xl bg-primary/5 border border-primary/20">
            <Utensils className="h-8 w-8 text-primary mb-3" />
            <h3 className="text-4xl font-bold text-foreground">+1,200</h3>
            <p className="text-muted-foreground font-medium mt-2">Kilos Rescatados</p>
          </div>
          <div className="p-8 md:p-12 rounded-2xl bg-secondary/5 border border-secondary/20">
            <HeartPulse className="h-8 w-8 text-secondary mb-3" />
            <h3 className="text-4xl font-bold text-foreground">15</h3>
            <p className="text-muted-foreground font-medium mt-2">ONGs Activas</p>
          </div>
          <div className="p-8 md:p-12 rounded-2xl bg-accent/5 border border-accent/20">
            <Users className="h-8 w-8 text-accent mb-3" />
            <h3 className="text-4xl font-bold text-foreground">340</h3>
            <p className="text-muted-foreground font-medium mt-2">Familias Ayudadas</p>
          </div>
          <div className="p-8 md:p-12 rounded-2xl bg-green-500/5 border border-green-500/20">
            <TrendingUp className="h-8 w-8 text-green-600 mb-3" />
            <h3 className="text-4xl font-bold text-foreground">98%</h3>
            <p className="text-muted-foreground font-medium mt-2">Comida Entregada</p>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Paso 1 */}
            <div className="flex flex-col items-start gap-4 p-8 rounded-2xl hover:bg-background hover:shadow-lg transition-all border border-transparent hover:border-border/50 group">
              <div className="p-4 rounded-full bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <Package className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-semibold">1. Publica el Excedente</h3>
              <p className="text-muted-foreground leading-relaxed">
                Los restaurantes y supermercados registran sus alimentos disponibles, indicando cantidad y caducidad de forma sencilla.
              </p>
            </div>
            
            {/* Paso 2 */}
            <div className="flex flex-col items-start gap-4 p-8 rounded-2xl hover:bg-background hover:shadow-lg transition-all border border-transparent hover:border-border/50 group">
              <div className="p-4 rounded-full bg-secondary/10 text-secondary group-hover:scale-110 group-hover:bg-secondary group-hover:text-secondary-foreground transition-all duration-300">
                <Handshake className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-semibold">2. Smart Match</h3>
              <p className="text-muted-foreground leading-relaxed">
                El sistema notifica instantáneamente a las organizaciones certificadas cercanas que necesitan exactamente ese tipo de donación.
              </p>
            </div>
            
            {/* Paso 3 */}
            <div className="flex flex-col items-start gap-4 p-8 rounded-2xl hover:bg-background hover:shadow-lg transition-all border border-transparent hover:border-border/50 group">
              <div className="p-4 rounded-full bg-accent/10 text-accent group-hover:scale-110 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                <HeartPulse className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-semibold">3. Recepción & Impacto</h3>
              <p className="text-muted-foreground leading-relaxed">
                La organización acude a recogerla localmente. Todo queda trazado generando reportes de impacto real.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CARACTERÍSTICAS */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">Diseñado para Todos</h2>
          <p className="text-muted-foreground text-lg">
            Herramientas potentes y fáciles de usar para donantes y organizaciones
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Para Donantes */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground mb-8">Para Donantes y Empresas</h3>
            <div className="flex gap-4">
              <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">Reduce Desperdicio</h4>
                <p className="text-muted-foreground">Dale segunda vida a tus excedentes alimentarios</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">Impacto Medible</h4>
                <p className="text-muted-foreground">Reportes detallados de tu aporte social</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">Certificación</h4>
                <p className="text-muted-foreground">Documentación para exenciones fiscales</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">Fácil y Rápido</h4>
                <p className="text-muted-foreground">Publica en minutos desde tu teléfono</p>
              </div>
            </div>
          </div>

          {/* Para Organizaciones */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground mb-8">Para Organizaciones</h3>
            <div className="flex gap-4">
              <CheckCircle2 className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">Acceso Verificado</h4>
                <p className="text-muted-foreground">Red de donantes confiables y verificados</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">Matching Automático</h4>
                <p className="text-muted-foreground">Sistema inteligente conecta necesidades</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">Reportes Detallados</h4>
                <p className="text-muted-foreground">Evidencia del impacto de tu trabajo</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">Red Global</h4>
                <p className="text-muted-foreground">Conecta con otros actores del cambio</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-primary/5 border-t border-b border-border/40 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">¿Listo para hacer la diferencia?</h2>
          <p className="text-muted-foreground text-lg mb-8">Únete a RedDonación y sé parte del cambio</p>
          <Link 
            to="/register"
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            Comienza Ahora
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-background py-12 border-t border-border/40">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 font-bold text-lg mb-4">
                <Leaf className="h-6 w-6 text-primary" />
                <span>RedDonación</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Conectando solidaridad con acción.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Producto</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li><a href="#" className="hover:text-foreground transition-colors">Características</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Precios</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacidad</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Términos</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Cookies</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Conecta</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li><a href="#" className="hover:text-foreground transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 RedDonación. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
