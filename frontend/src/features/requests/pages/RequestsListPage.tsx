import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import type { Request } from '@/features/requests/api/requests';
import { requestsApi } from '@/features/requests/api/requests';
import { useAuth } from '@/features/auth/hooks/useAuth';

export const RequestsListPage = () => {
  const { user } = useAuth();
  
  const { data: allRequests = [], isLoading } = useQuery({
    queryKey: ['requests'],
    queryFn: () => requestsApi.getAll(),
  });

  const isDonor = user?.role === 'donor';

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5 pt-24 pb-16">
      <div className="container mx-auto px-6">
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Solicitudes de Ayuda</h1>
            <p className="text-muted-foreground">Organizaciones que necesitan apoyo</p>
          </div>
          {!isDonor && (
            <Link to="/requests/new">
              <Button>
                <Plus className="h-4 w-4" />
                Nueva Solicitud
              </Button>
            </Link>
          )}
        </div>

        {/* Grid de solicitudes */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-80 bg-muted rounded-lg animate-pulse" />
            ))}
          </div>
        ) : allRequests.length > 0 ? (
          <>
            <p className="text-sm text-muted-foreground mb-6">
              Se encontraron <span className="font-bold text-foreground">{allRequests.length}</span> solicitudes abiertas
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allRequests.map((request: Request) => (
                <Link key={request.id} to={`/requests/${request.id}`}>
                  <Card hover className="h-full flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="secondary" size="sm">{request.quantity_needed} {request.unit}</Badge>
                      <Badge 
                        variant={request.status === 'open' ? 'primary' : 'success'} 
                        size="sm"
                      >
                        {request.status}
                      </Badge>
                    </div>
                    
                    <CardHeader 
                      title={request.title}
                      subtitle={request.food_type}
                    />
                    
                    <CardContent className="flex-grow">
                      <p className="text-sm text-muted-foreground line-clamp-3">{request.description}</p>
                    </CardContent>
                    
                    <div className="text-xs text-muted-foreground border-t border-border/30 pt-3 mt-3">
                      <p>Creado: {new Date(request.created_at).toLocaleDateString()}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <Card className="text-center py-12">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">¡Todas las solicitudes han sido satisfechas!</h3>
            <p className="text-muted-foreground">O no hay solicitudes activas en este momento</p>
          </Card>
        )}
      </div>
    </div>
  );
};
