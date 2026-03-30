import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, Link } from 'react-router-dom';
import { AlertCircle, Loader2, ArrowRight, Leaf, Lock, Mail } from 'lucide-react';

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
      navigate('/dashboard');
    }
  });

  const onSubmit = (data: LoginFormValues) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 px-4">
      <div className="w-full max-w-md">
        {/* Encabezado */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Leaf className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Bienvenido</h1>
          <p className="text-muted-foreground text-lg">Continúa con tu cuenta de RedDonación</p>
        </div>

        {/* Card de login */}
        <div className="bg-background rounded-2xl shadow-lg border border-border p-8">
          {mutation.isError && (
            <div className="mb-6 bg-destructive/10 text-destructive text-sm font-medium p-4 rounded-lg flex items-start gap-3">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <span>Credenciales incorrectas o el usuario no existe.</span>
            </div>
          )}

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Correo Electrónico
              </label>
              <input
                {...form.register('email')}
                type="email"
                placeholder="tu@correo.org"
                className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground"
              />
              {form.formState.errors.email && (
                <p className="text-xs font-medium text-destructive flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3 w-3" />
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Contraseña
              </label>
              <input
                {...form.register('password')}
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground"
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
              className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-6"
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

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground">
              ¿No tienes cuenta?{' '}
              <Link to="/register" className="font-semibold text-primary hover:underline">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>

        {/* Info adicional */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            Al acceder, aceptas nuestros{' '}
            <a href="#" className="text-primary hover:underline">Términos de Servicio</a>{' '}
            y{' '}
            <a href="#" className="text-primary hover:underline">Política de Privacidad</a>
          </p>
        </div>
      </div>
    </div>
  );
};
