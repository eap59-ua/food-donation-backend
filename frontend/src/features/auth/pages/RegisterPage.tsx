import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, Link } from 'react-router-dom';
import { AlertCircle, Loader2, UserPlus } from 'lucide-react';

import { authApi } from '../api/auth';

const registerSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Por favor ingresa un correo electrónico válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  role: z.enum(['DONANTE', 'RECEPTOR', 'ONG'], {
    message: 'Por favor selecciona un rol válido'
  })
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export const RegisterPage = () => {
  const navigate = useNavigate();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', role: 'RECEPTOR' }
  });

  const mutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: () => {
      // Upon successful registration, redirect to login
      navigate('/login');
    }
  });

  const onSubmit = (data: RegisterFormValues) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center bg-muted/20 px-4">
      <div className="w-full max-w-lg bg-background rounded-2xl shadow-sm border border-border overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Crear Cuenta</h1>
          <p className="text-muted-foreground mb-8">Únete a la red y comienza a generar impacto social</p>
          
          {mutation.isError && (
            <div className="mb-6 bg-destructive/10 text-destructive text-sm font-medium p-4 rounded-lg flex items-start gap-3">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <span>Ocurrió un error al registrarte. Quizás el correo ya esté en uso.</span>
            </div>
          )}

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Nombre / Organización</label>
              <input
                {...form.register('name')}
                type="text"
                placeholder="Nombre de tu entidad"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground"
              />
              {form.formState.errors.name && (
                <p className="text-xs font-medium text-destructive flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3 w-3" />
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Correo electrónico</label>
              <input
                {...form.register('email')}
                type="email"
                placeholder="tu@organizacion.org"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground"
              />
              {form.formState.errors.email && (
                <p className="text-xs font-medium text-destructive flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3 w-3" />
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Tipo de Cuenta</label>
              <select
                {...form.register('role')}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              >
                <option value="RECEPTOR">Beneficiario / Familia</option>
                <option value="DONANTE">Donante / Restaurante</option>
                <option value="ONG">Supervisión / ONG</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Contraseña</label>
              <input
                {...form.register('password')}
                type="password"
                placeholder="Mínimo 6 caracteres"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground"
              />
              {form.formState.errors.password && (
                <p className="text-xs font-medium text-destructive flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3 w-3" />
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={mutation.isPending}
              className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {mutation.isPending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Completar Registro
                  <UserPlus className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>
        
        <div className="p-6 bg-muted/40 border-t border-border flex justify-between items-center text-sm">
          <span className="text-muted-foreground">¿Ya tienes cuenta?</span>
          <Link to="/login" className="font-semibold text-primary hover:underline">Accede aquí</Link>
        </div>
      </div>
    </div>
  );
};
