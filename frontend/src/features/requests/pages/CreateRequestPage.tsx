import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, Link } from 'react-router-dom';
import { AlertCircle, Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Card } from '@/components/common/Card';
import { requestsApi } from '@/features/requests/api/requests';

const createRequestSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  food_type: z.string().min(2, 'Especifica el tipo de alimento'),
  quantity_needed: z.number().positive('La cantidad debe ser positiva'),
  unit: z.enum(['kg', 'l', 'porción', 'caja', 'bolsa']).or(z.string().refine((v) => ['kg', 'l', 'porción', 'caja', 'bolsa'].includes(v), 'Selecciona una unidad válida')),
});

type CreateRequestFormValues = z.infer<typeof createRequestSchema>;

export const CreateRequestPage = () => {
  const navigate = useNavigate();

  const form = useForm<CreateRequestFormValues>({
    resolver: zodResolver(createRequestSchema),
    defaultValues: {
      title: '',
      description: '',
      food_type: '',
      quantity_needed: 0,
      unit: 'kg',
    }
  });

  const mutation = useMutation({
    mutationFn: (data: CreateRequestFormValues) => requestsApi.create(data),
    onSuccess: () => {
      navigate('/dashboard');
    }
  });

  const onSubmit = (data: CreateRequestFormValues) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5 pt-24 pb-16">
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
            <h1 className="text-4xl font-bold text-foreground mb-2">Solicitar Ayuda</h1>
            <p className="text-muted-foreground text-lg">Cuéntanos qué necesita tu organización</p>
          </div>

          <Card className="max-w-2xl">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Sección 1: Identificación */}
              <div className="space-y-4 pb-6 border-b border-border/30">
                <h2 className="text-lg font-semibold text-foreground">Información de la Solicitud</h2>
                
                <Input
                  label="Título de la Solicitud"
                  placeholder="Ej: Frutas frescas para comedores"
                  {...form.register('title')}
                  error={form.formState.errors.title?.message}
                />

                <div>
                  <label className="text-sm font-semibold text-foreground block mb-2">Descripción Detallada</label>
                  <textarea
                    placeholder="Describe qué alimentos necesita tu organización, cómo los usarás, y el impacto que tendrá..."
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

              {/* Sección 2: Cantidad Necesaria */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-foreground">Cantidad Requerida</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Cantidad"
                    type="number"
                    placeholder="100"
                    {...form.register('quantity_needed', { valueAsNumber: true })}
                    error={form.formState.errors.quantity_needed?.message}
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

                <div className="p-4 bg-secondary/5 border border-secondary/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    💡 Sé específico sobre la cantidad para ayudarnos a encontrar donantes que se adapten a tus necesidades.
                  </p>
                </div>
              </div>

              {mutation.isError && (
                <div className="bg-destructive/10 text-destructive text-sm font-medium p-4 rounded-lg flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                  <span>Error al crear la solicitud. Intenta nuevamente.</span>
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
                  className="flex-1 bg-secondary text-secondary-foreground font-semibold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-secondary/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {mutation.isPending ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    'Crear Solicitud'
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
