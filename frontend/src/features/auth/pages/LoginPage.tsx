import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, Link } from 'react-router-dom';
import { AlertCircle, Loader2, ArrowRight } from 'lucide-react';

import { authApi } from '../api/auth';
import { useAuth } from '../hooks/useAuth';

const loginSchema = z.object({
  email: z.string().email('Por favor ingresa un correo electrónico válido'),
  password: z.string().min(1, 'La contraseña es obligatoria')
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' }
  });

  const mutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      login(data.access_token);
      navigate('/');
    }
  });

  const onSubmit = (data: LoginFormValues) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center bg-muted/20 px-4">
      <div className="w-full max-w-md bg-background rounded-2xl shadow-sm border border-border overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Acceder</h1>
          <p className="text-muted-foreground mb-8">Inicia sesión para gestionar tus donaciones</p>
          
          {mutation.isError && (
            <div className="mb-6 bg-destructive/10 text-destructive text-sm font-medium p-4 rounded-lg flex items-start gap-3">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <span>Credenciales incorrectas o el usuario no existe.</span>
            </div>
          )}

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
              <label className="text-sm font-semibold text-foreground">Contraseña</label>
              <input
                {...form.register('password')}
                type="password"
                placeholder="••••••••"
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
                  Iniciar Sesión
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>
        
        <div className="p-6 bg-muted/40 border-t border-border flex justify-between items-center text-sm">
          <span className="text-muted-foreground">¿No tienes cuenta?</span>
          <Link to="/register" className="font-semibold text-primary hover:underline">Únete ahora</Link>
        </div>
      </div>
    </div>
  );
};
