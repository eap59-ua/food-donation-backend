import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Loader2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Card } from '@/components/common/Card';
import { donationsApi } from '@/features/donations/api/donations';

const createDonationSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  food_type: z.string().min(2, 'Especifica el tipo de alimento'),
  quantity: z.number().positive('La cantidad debe ser positiva'),
  unit: z.enum(['kg', 'l', 'porción', 'caja', 'bolsa']).or(z.string().refine((v) => ['kg', 'l', 'porción', 'caja', 'bolsa'].includes(v), 'Selecciona una unidad válida')),
  expiry_date: z.string().refine((date) => new Date(date) > new Date(), 'La fecha debe ser en el futuro'),
  location: z.string().min(5, 'Indica la ubicación completa'),
});

type CreateDonationFormValues = z.infer<typeof createDonationSchema>;

export const CreateDonationPage = () => {
  const navigate = useNavigate();

  const form = useForm<CreateDonationFormValues>({
    resolver: zodResolver(createDonationSchema),
    defaultValues: {
      title: '',
      description: '',
      food_type: '',
      quantity: 0,
      unit: 'kg',
      expiry_date: '',
      location: '',
    }
  });

  const mutation = useMutation({
    mutationFn: (data: CreateDonationFormValues) => donationsApi.create(data),
    onSuccess: () => {
      navigate('/dashboard');
    }
  });

  const onSubmit = (data: CreateDonationFormValues) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pt-24 pb-16">
      <div className="container mx-auto px-6">
        {/* Encabezado */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />
            Volver
          </Link>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-2">Compartir una Donación</h1>
            <p className="text-muted-foreground text-lg">Ayuda a reducir el desperdicio alimentario y lidera el cambio</p>
          </div>

          <Card className="max-w-2xl">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Sección 1: Identificación */}
              <div className="space-y-4 pb-6 border-b border-border/30">
                <h2 className="text-lg font-semibold text-foreground">Información Básica</h2>
                
                <Input
                  label="Título de la Donación"
                  placeholder="Ej: Frutas frescas - Manzanas Red Delicious"
                  {...form.register('title')}
                  error={form.formState.errors.title?.message}
                />

                <div>
                  <label className="text-sm font-semibold text-foreground block mb-2">Descripción</label>
                  <textarea
                    placeholder="Describe los alimentos con detalle: estado, almacenamiento, cantidad aproximada..."
                    value={form.watch('description')}
                    onChange={(e) => form.setValue('description', e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground h-32"
                  />
                  {form.formState.errors.description && (
                    <p className="text-xs text-destructive font-medium mt-1">{form.formState.errors.description.message}</p>
                  )}
                </div>

                <Input
                  label="Tipo de Alimento"
                  placeholder="Ej: Frutas, Verduras, Productos Lácteos, Panadería"
                  {...form.register('food_type')}
                  error={form.formState.errors.food_type?.message}
                />
              </div>

              {/* Sección 2: Cantidad y Características */}
              <div className="space-y-4 pb-6 border-b border-border/30">
                <h2 className="text-lg font-semibold text-foreground">Cantidad y Características</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Cantidad"
                    type="number"
                    placeholder="100"
                    {...form.register('quantity', { valueAsNumber: true })}
                    error={form.formState.errors.quantity?.message}
                  />

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground block">Unidad</label>
                    <select
                      {...form.register('unit')}
                      className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    >
                      <option value="kg">Kilogramos (kg)</option>
                      <option value="l">Litros (l)</option>
                      <option value="porción">Porciones</option>
                      <option value="caja">Cajas</option>
                      <option value="bolsa">Bolsas</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-foreground block mb-2">Fecha de Caducidad</label>
                  <input
                    type="datetime-local"
                    {...form.register('expiry_date')}
                    className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                  {form.formState.errors.expiry_date && (
                    <p className="text-xs text-destructive font-medium mt-1">{form.formState.errors.expiry_date.message}</p>
                  )}
                </div>
              </div>

              {/* Sección 3: Ubicación */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-foreground">Ubicación de Recogida</h2>
                
                <Input
                  label="Dirección Completa"
                  placeholder="Calle Principal 123, Ciudad, Código Postal"
                  {...form.register('location')}
                  error={form.formState.errors.location?.message}
                />

                <div className="p-4 bg-secondary/5 border border-secondary/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    💡 Proporciona una dirección clara para que las organizaciones puedan planificar la recogida fácilmente.
                  </p>
                </div>
              </div>

              {mutation.isError && (
                <div className="bg-destructive/10 text-destructive text-sm font-medium p-4 rounded-lg flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                  <span>Error al crear la donación. Intenta nuevamente.</span>
                </div>
              )}

              {/* Botones */}
              <div className="flex gap-3 pt-6 border-t border-border/30">
                <Link to="/dashboard" className="flex-1">
                  <Button variant="outline" fullWidth>
                    Cancelar
                  </Button>
                </Link>
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="flex-1 bg-primary text-primary-foreground font-semibold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {mutation.isPending ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    'Compartir Donación'
                  )}
                </button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};
