import { useQuery } from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Plus, MapPin, Clock } from 'lucide-react';
import { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import type { Donation } from '@/features/donations/api/donations';
import { donationsApi } from '@/features/donations/api/donations';
import { useAuth } from '@/features/auth/hooks/useAuth';

export const DonationsListPage = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const { data: allDonations = [], isLoading } = useQuery({
    queryKey: ['donations'],
    queryFn: () => donationsApi.getAll(),
  });

  const donations = allDonations.filter(d => {
    const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         d.food_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         d.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || d.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchParams({ q: searchQuery });
  };

  const getTimeAgo = (date: string) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d atrás`;
    if (hours > 0) return `${hours}h atrás`;
    return 'Ahora';
  };

  const getTimeToExpiry = (date: string) => {
    const now = new Date();
    const expiry = new Date(date);
    const diff = expiry.getTime() - now.getTime();
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d`;
    if (hours > 0) return `${hours}h`;
    return 'Expirando';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pt-24 pb-16">
      <div className="container mx-auto px-6">
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Donaciones Disponibles</h1>
            <p className="text-muted-foreground">Descubre alimentos que puedes ayudar a rescatar</p>
          </div>
          {user?.role === 'donor' && (
            <Link to="/donations/new">
              <Button>
                <Plus className="h-4 w-4" />
                Nueva Donación
              </Button>
            </Link>
          )}
        </div>

        {/* Búsqueda y filtros */}
        <div className="mb-8 space-y-4">
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar por tipo de alimento, ubicación..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground"
              />
            </div>
            <Button type="submit">Buscar</Button>
          </form>

          {/* Filtros de estado */}
          <div className="flex gap-3 flex-wrap">
            {['all', 'available', 'claimed', 'expired'].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedStatus === status
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary/10 text-secondary-foreground border border-secondary/20 hover:bg-secondary/20'
                }`}
              >
                {status === 'all' ? 'Todas' : status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de donaciones */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-80 bg-muted rounded-lg animate-pulse" />
            ))}
          </div>
        ) : donations.length > 0 ? (
          <>
            <p className="text-sm text-muted-foreground mb-6">
              Se encontraron <span className="font-bold text-foreground">{donations.length}</span> donaciones
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {donations.map((donation) => (
                <Link key={donation.id} to={`/donations/${donation.id}`}>
                  <Card hover className="h-full flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="primary" size="sm">{donation.quantity} {donation.unit}</Badge>
                      <Badge 
                        variant={donation.status === 'available' ? 'success' : donation.status === 'claimed' ? 'warning' : 'destructive'} 
                        size="sm"
                      >
                        {donation.status}
                      </Badge>
                    </div>
                    
                    <CardHeader 
                      title={donation.title}
                      subtitle={donation.food_type}
                    />
                    
                    <CardContent className="flex-grow">
                      <p className="text-sm text-muted-foreground line-clamp-3">{donation.description}</p>
                    </CardContent>
                    
                    <div className="space-y-2 text-xs text-muted-foreground border-t border-border/30 pt-3 mt-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {donation.location}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Vence en {getTimeToExpiry(donation.expiry_date)}
                        </div>
                        <span className="text-xs">{getTimeAgo(donation.created_at)}</span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <Card className="text-center py-12">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No se encontraron donaciones</h3>
            <p className="text-muted-foreground">Intenta con otros términos de búsqueda o filtros</p>
          </Card>
        )}
      </div>
    </div>
  );
};
