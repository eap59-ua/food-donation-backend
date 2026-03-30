import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, User } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { requestsApi } from '@/features/requests/api/requests';

export const RequestDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  
  const { data: request, isLoading } = useQuery({
    queryKey: ['request', id],
    queryFn: () => id ? requestsApi.getById(id) : Promise.reject('No ID'),
  });

  if (isLoading || !request) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5 pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="h-96 bg-muted rounded-lg animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5 pt-24 pb-16">
      <div className="container mx-auto px-6">
        <Link to="/requests" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="h-5 w-5" />
          Volver a Solicitudes
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenido principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <Card>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-foreground mb-2">{request.title}</h1>
                  <p className="text-lg text-muted-foreground">{request.food_type}</p>
                </div>
                <Badge 
                  variant={request.status === 'open' ? 'primary' : 'success'} 
                  size="lg"
                >
                  {request.status === 'open' ? 'Abierta' : request.status === 'matched' ? 'Emparejada' : 'Completada'}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border/30">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Cantidad Necesaria</p>
                  <p className="text-2xl font-bold text-foreground">{request.quantity_needed} {request.unit}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Creado</p>
                  <p className="text-lg font-semibold text-foreground">{new Date(request.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            </Card>

            {/* Descripción */}
            <Card>
              <h2 className="text-xl font-semibold text-foreground mb-4">Descripción</h2>
              <p className="text-muted-foreground leading-relaxed">{request.description}</p>
            </Card>

            {/* Donaciones Coincidentes */}
            <Card>
              <h2 className="text-xl font-semibold text-foreground mb-4">Donaciones Disponibles</h2>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>Se mostrarán aquí las donaciones que coinciden con esta solicitud.</p>
                <Button fullWidth>Ver Donaciones Relacionadas</Button>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Card de acción */}
            {request.status === 'open' && (
              <Card className="border-2 border-secondary/40 bg-secondary/5">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">¿Tienes lo que necesitan?</h3>
                    <p className="text-sm text-muted-foreground">Oferece una donación que coincida con esta solicitud.</p>
                  </div>
                  <Button fullWidth>
                    Oferecer Donación
                  </Button>
                </div>
              </Card>
            )}

            {/* Info de la organización */}
            <Card>
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <User className="h-5 w-5" />
                Organización Solicitante
              </h3>
              <div className="space-y-3">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">ID de Organización</p>
                  <p className="font-mono text-sm text-foreground break-all">{request.organization_id}</p>
                </div>
              </div>
            </Card>

            {/* Estado */}
            <Card>
              <h3 className="font-semibold text-foreground mb-4">Historial</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <div>
                    <p className="font-medium text-foreground">Solicitud Creada</p>
                    <p className="text-xs text-muted-foreground">{new Date(request.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                {request.status !== 'open' && (
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <p className="font-medium text-foreground capitalize">Estado: {request.status}</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Tips */}
            <Card className="bg-accent/5 border-accent/20">
              <h3 className="font-semibold text-foreground mb-3">Tips para Donantes</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>✓ Revisa los detalles completos</li>
                <li>✓ Verifica la disponibilidad</li>
                <li>✓ Coordina la entrega</li>
                <li>✓ Reporta el progreso</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
