import { useQuery, useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ArrowLeft, Loader2, AlertCircle, User, Mail, Award, Calendar } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Badge } from '@/components/common/Badge';
import { usersApi } from '@/features/users/api/users';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useState } from 'react';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['users', 'profile'],
    queryFn: () => usersApi.getProfile(),
  });

  const { data: stats } = useQuery({
    queryKey: ['users', 'stats'],
    queryFn: () => usersApi.getStats(),
  });

  const updateMutation = useMutation({
    mutationFn: (data: { name: string }) => usersApi.updateProfile(data),
    onSuccess: () => {
      setIsEditing(false);
    }
  });

  const handleSave = () => {
    if (name.trim()) {
      updateMutation.mutate({ name });
    }
  };

  if (profileLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="h-96 bg-muted rounded-lg animate-pulse" />
        </div>
      </div>
    );
  }

  const roleDisplay = profile?.role === 'donor' ? 'Donante' : 'Organización';
  const roleIcon = profile?.role === 'donor' ? '🎁' : '🤝';

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pt-24 pb-16">
      <div className="container mx-auto px-6">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="h-5 w-5" />
          Volver al Dashboard
        </Link>

        <div className="max-w-4xl">
          {/* Header Profile */}
          <Card className="mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="p-4 bg-primary/10 rounded-lg">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">{profile?.name}</h1>
                  <Badge variant="primary" size="lg">
                    {roleIcon} {roleDisplay}
                  </Badge>
                </div>
              </div>
              <Button onClick={() => { setIsEditing(!isEditing); setName(profile?.name || ''); }}>
                {isEditing ? 'Cancelar' : 'Editar Perfil'}
              </Button>
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Información Personal */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader title="Información Personal" />
                <CardContent>
                  {isEditing ? (
                    <div className="space-y-4">
                      <Input
                        label="Nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <div className="flex gap-3">
                        <Button 
                          variant="outline" 
                          onClick={() => setIsEditing(false)}
                        >
                          Cancelar
                        </Button>
                        <Button 
                          onClick={handleSave}
                          disabled={updateMutation.isPending}
                        >
                          {updateMutation.isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            'Guardar Cambios'
                          )}
                        </Button>
                      </div>
                      {updateMutation.isError && (
                        <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg flex items-center gap-2">
                          <AlertCircle className="h-4 w-4" />
                          Error al actualizar
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <Mail className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Correo</p>
                          <p className="font-medium text-foreground">{profile?.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <User className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Nombre</p>
                          <p className="font-medium text-foreground">{profile?.name}</p>
                        </div>
                      </div>
                      {profile?.organization_name && (
                        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                          <Award className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Organización</p>
                            <p className="font-medium text-foreground">{profile.organization_name}</p>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Miembro desde</p>
                          <p className="font-medium text-foreground">{new Date(profile?.created_at || '').toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Términos */}
              <Card>
                <CardHeader title="Preferencias y Seguridad" />
                <CardContent>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted transition-colors">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm text-foreground">Recibir notificaciones por correo</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted transition-colors">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm text-foreground">Permitir que otros vean mi perfil</span>
                    </label>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Stats Sidebar */}
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <CardHeader title="Tu Impacto" />
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-4xl font-bold text-primary mb-1">{stats?.donations ?? 0}</p>
                      <p className="text-sm text-muted-foreground">
                        {profile?.role === 'donor' ? 'Donaciones' : 'Solicitudes'}
                      </p>
                    </div>
                    <div className="h-px bg-border/30" />
                    <div className="text-center">
                      <p className="text-4xl font-bold text-green-600 mb-1">{stats?.impact_kg ?? 0}</p>
                      <p className="text-sm text-muted-foreground">Kg Rescatados</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader title="Recursos Útiles" />
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a href="#" className="text-primary hover:underline">
                        Centro de Ayuda
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-primary hover:underline">
                        Reportar Problema
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-primary hover:underline">
                        Preguntas Frecuentes
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-primary hover:underline">
                        Contactar Soporte
                      </a>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-accent/5 border-accent/20">
                <CardHeader title="Verificación" />
                <CardContent>
                  <Badge variant="success">
                    ✓ Cuenta Verificada
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-3">
                    Tu cuenta ha sido confirmada por correo electrónico.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
