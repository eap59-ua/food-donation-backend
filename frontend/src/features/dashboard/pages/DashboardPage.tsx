import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Heart, Package, TrendingUp, Users, ArrowRight, Plus, Zap } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { donationsApi } from '@/features/donations/api/donations';
import { requestsApi } from '@/features/requests/api/requests';
import { usersApi } from '@/features/users/api/users';
import { useAuth } from '@/features/auth/hooks/useAuth';

export const DashboardPage = () => {
  const { user } = useAuth();
  
  const { data: donations = [] } = useQuery({
    queryKey: ['donations', 'recent'],
    queryFn: () => donationsApi.getAll(),
  });

  const { data: requests = [] } = useQuery({
    queryKey: ['requests', 'recent'],
    queryFn: () => requestsApi.getAll(),
  });

  const { data: stats } = useQuery({
    queryKey: ['users', 'stats'],
    queryFn: () => usersApi.getStats(),
  });

  const isDonor = user?.role === 'donor';
  const recentDonations = donations.slice(0, 3);
  const recentRequests = requests.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pt-24 pb-16">
      <div className="container mx-auto px-6">
        {/* Encabezado */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Bienvenido, {user?.sub?.split('@')[0] || 'Usuario'}
          </h1>
          <p className="text-muted-foreground text-lg">
            {isDonor ? 'Comparte alimentos, cambia vidas' : 'Recibe recursos, ayuda a más personas'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium mb-1">Donaciones</p>
                <p className="text-3xl font-bold text-foreground">{stats?.donations ?? 0}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <Package className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium mb-1">Solicitudes</p>
                <p className="text-3xl font-bold text-foreground">{stats?.requests ?? 0}</p>
              </div>
              <div className="p-3 bg-secondary/10 rounded-lg">
                <Heart className="h-6 w-6 text-secondary" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium mb-1">Impacto (kg)</p>
                <p className="text-3xl font-bold text-foreground">{stats?.impact_kg ?? 0}</p>
              </div>
              <div className="p-3 bg-green-500/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium mb-1">Red</p>
                <p className="text-3xl font-bold text-foreground">842</p>
              </div>
              <div className="p-3 bg-accent/10 rounded-lg">
                <Users className="h-6 w-6 text-accent" />
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {isDonor ? (
            <>
              <Card className="border-2 border-primary/40 bg-primary/5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Nueva Donación</h3>
                    <p className="text-muted-foreground mb-4">Comparte tus excedentes alimentarios</p>
                    <Link to="/donations/new">
                      <Button size="sm">
                        <Plus className="h-4 w-4" />
                        Crear Donación
                      </Button>
                    </Link>
                  </div>
                  <Zap className="h-12 w-12 text-primary/40" />
                </div>
              </Card>

              <Card>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Explorar Solicitudes</h3>
                  <p className="text-muted-foreground mb-4">Descubre organizaciones que necesitan ayuda</p>
                  <Link to="/requests">
                    <Button variant="secondary" size="sm">
                      Ver Solicitudes
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </>
          ) : (
            <>
              <Card className="border-2 border-secondary/40 bg-secondary/5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Nueva Solicitud</h3>
                    <p className="text-muted-foreground mb-4">Pide lo que tu organización necesita</p>
                    <Link to="/requests/new">
                      <Button size="sm">
                        <Plus className="h-4 w-4" />
                        Crear Solicitud
                      </Button>
                    </Link>
                  </div>
                  <Heart className="h-12 w-12 text-secondary/40" />
                </div>
              </Card>

              <Card>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Descubrir Donaciones</h3>
                  <p className="text-muted-foreground mb-4">Encuentra alimentos disponibles cerca de ti</p>
                  <Link to="/donations">
                    <Button variant="secondary" size="sm">
                      Ver Donaciones
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </>
          )}
        </div>

        {/* Contenido principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Donaciones recientes */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Donaciones Recientes</h2>
              <Link to="/donations">
                <Button variant="ghost" size="sm">
                  Ver todas <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              {recentDonations.length > 0 ? (
                recentDonations.map((donation) => (
                  <Card key={donation.id} hover>
                    <Link to={`/donations/${donation.id}`}>
                      <CardHeader 
                        title={donation.title}
                        subtitle={donation.food_type}
                        icon={<Badge>{donation.quantity} {donation.unit}</Badge>}
                      />
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-2">{donation.description}</p>
                      </CardContent>
                      <CardFooter>
                        <span className="text-xs text-muted-foreground">{donation.location}</span>
                        <Badge variant={donation.status === 'available' ? 'success' : 'warning'} size="sm">
                          {donation.status}
                        </Badge>
                      </CardFooter>
                    </Link>
                  </Card>
                ))
              ) : (
                <Card>
                  <p className="text-center text-muted-foreground py-8">No hay donaciones disponibles</p>
                </Card>
              )}
            </div>
          </div>

          {/* Solicitudes */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Solicitudes</h2>
              <Link to="/requests">
                <Button variant="ghost" size="sm">
                  Ver todas <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              {recentRequests.length > 0 ? (
                recentRequests.map((request) => (
                  <Card key={request.id} hover>
                    <Link to={`/requests/${request.id}`}>
                      <CardHeader 
                        title={request.title}
                        subtitle={request.food_type}
                      />
                      <CardFooter>
                        <Badge variant={request.status === 'open' ? 'primary' : 'success'} size="sm">
                          {request.status}
                        </Badge>
                      </CardFooter>
                    </Link>
                  </Card>
                ))
              ) : (
                <Card>
                  <p className="text-center text-muted-foreground py-8">Sin solicitudes</p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
