import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, CheckCircle, Clock } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { donationsApi } from '@/features/donations/api/donations';

interface DonationDetailPageProps {
  donationId: string;
}

export const DonationDetailPage = ({ donationId }: DonationDetailPageProps) => {
  const { data: donation, isLoading } = useQuery({
    queryKey: ['donation', donationId],
    queryFn: () => donationsApi.getById(donationId),
    enabled: !!donationId,
  });

  if (isLoading || !donation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="h-96 bg-muted rounded-lg animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pt-24 pb-16">
      <div className="container mx-auto px-6">
        <Link to="/donations" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="h-5 w-5" />
          Volver a Donaciones
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenido principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <Card>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-foreground mb-2">{donation.title}</h1>
                  <p className="text-lg text-muted-foreground">{donation.food_type}</p>
                </div>
                <Badge 
                  variant={donation.status === 'available' ? 'success' : donation.status === 'claimed' ? 'warning' : 'destructive'} 
                  size="lg"
                >
                  {donation.status === 'available' ? 'Disponible' : donation.status === 'claimed' ? 'Reclamado' : 'Expirado'}
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/30">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Cantidad</p>
                  <p className="text-2xl font-bold text-foreground">{donation.quantity} {donation.unit}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Fecha de Caducidad</p>
                  <p className="text-lg font-semibold text-foreground">{new Date(donation.expiry_date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Publicado</p>
                  <p className="text-lg font-semibold text-foreground">{new Date(donation.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            </Card>

            {/* Descripción */}
            <Card>
              <h2 className="text-xl font-semibold text-foreground mb-4">Descripción</h2>
              <p className="text-muted-foreground leading-relaxed">{donation.description}</p>
            </Card>

            {/* Ubicación */}
            <Card>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">Ubicación de Recogida</h3>
                  <p className="text-muted-foreground">{donation.location}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Card de acción */}
            {donation.status === 'available' && (
              <Card className="border-2 border-primary/40 bg-primary/5">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">¿Quieres recibir esta donación?</h3>
                    <p className="text-sm text-muted-foreground">Confirma tu interés y nos pondremos en contacto para coordinar la recogida.</p>
                  </div>
                  <Button fullWidth>
                    <Heart className="h-4 w-4" />
                    Reclamar Donación
                  </Button>
                </div>
              </Card>
            )}

            {/* Info del donor */}
            <Card>
              <h3 className="font-semibold text-foreground mb-4">Información del Donante</h3>
              <div className="space-y-3">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">ID del Donante</p>
                  <p className="font-mono text-sm text-foreground break-all">{donation.donor_id}</p>
                </div>
              </div>
            </Card>

            {/* Estado del envío */}
            <Card>
              <h3 className="font-semibold text-foreground mb-4">Estado</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="text-sm text-foreground">Publicado</span>
                </div>
                {donation.status !== 'available' && (
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-sm text-foreground capitalize">{donation.status}</span>
                  </div>
                )}
                {donation.status === 'available' && (
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-yellow-500" />
                    <span className="text-sm text-foreground">En espera de reclamación</span>
                  </div>
                )}
              </div>
            </Card>

            {/* Consejos */}
            <Card className="bg-accent/5 border-accent/20">
              <h3 className="font-semibold text-foreground mb-3">Consejos para la Recogida</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>✓ Verifica las fechas de caducidad</li>
                <li>✓ Transporta en contenedores limpios</li>
                <li>✓ Mantén la cadena de frío si es necesario</li>
                <li>✓ Documenta el proceso</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
