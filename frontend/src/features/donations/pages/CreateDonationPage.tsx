import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, Link } from 'react-router-dom';
import { AlertCircle, Loader2, PlusCircle, ArrowLeft } from 'lucide-react';
import { donationsApi } from '../api/donations';

const createDonationSchema = z.object({
    title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
    description: z.string().optional(),
    quantity: z.string().min(1, 'La cantidad es obligatoria'),
    location_address: z.string().min(3, 'La dirección es obligatoria'),
    expiration_date: z.string().optional(),
});

type CreateDonationFormValues = z.infer<typeof createDonationSchema>;

export const CreateDonationPage = () => {
    const navigate = useNavigate();

    const form = useForm<CreateDonationFormValues>({
        resolver: zodResolver(createDonationSchema),
        defaultValues: { title: '', description: '', quantity: '', location_address: '', expiration_date: '' },
    });

    const mutation = useMutation({
        mutationFn: (data: CreateDonationFormValues) =>
            donationsApi.create({
                ...data,
                expiration_date: data.expiration_date || undefined,
            }),
        onSuccess: () => {
            navigate('/donations');
        },
    });

    const onSubmit = (data: CreateDonationFormValues) => {
        mutation.mutate(data);
    };

    return (
        <div className="min-h-screen pt-24 pb-12 bg-muted/20 px-4">
            <div className="w-full max-w-2xl mx-auto">
                <Link
                    to="/donations"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Volver a donaciones
                </Link>

                <div className="bg-background rounded-2xl shadow-sm border border-border overflow-hidden">
                    <div className="p-8">
                        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Nueva Donación</h1>
                        <p className="text-muted-foreground mb-8">Publica un excedente alimentario para que otros lo aprovechen</p>

                        {mutation.isError && (
                            <div className="mb-6 bg-destructive/10 text-destructive text-sm font-medium p-4 rounded-lg flex items-start gap-3">
                                <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                                <span>Ocurrió un error al crear la donación. Inténtalo de nuevo.</span>
                            </div>
                        )}

                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-foreground">Título *</label>
                                <input
                                    {...form.register('title')}
                                    type="text"
                                    placeholder="Ej: Frutas y verduras frescas"
                                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground"
                                />
                                {form.formState.errors.title && (
                                    <p className="text-xs font-medium text-destructive flex items-center gap-1 mt-1">
                                        <AlertCircle className="h-3 w-3" />
                                        {form.formState.errors.title.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-foreground">Descripción</label>
                                <textarea
                                    {...form.register('description')}
                                    placeholder="Detalla los alimentos que ofreces..."
                                    rows={3}
                                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground resize-none"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-foreground">Cantidad *</label>
                                    <input
                                        {...form.register('quantity')}
                                        type="text"
                                        placeholder="Ej: 10 kg, 20 unidades"
                                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground"
                                    />
                                    {form.formState.errors.quantity && (
                                        <p className="text-xs font-medium text-destructive flex items-center gap-1 mt-1">
                                            <AlertCircle className="h-3 w-3" />
                                            {form.formState.errors.quantity.message}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-foreground">Fecha de Caducidad</label>
                                    <input
                                        {...form.register('expiration_date')}
                                        type="datetime-local"
                                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-foreground">Dirección de Recogida *</label>
                                <input
                                    {...form.register('location_address')}
                                    type="text"
                                    placeholder="Calle, número, ciudad..."
                                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground"
                                />
                                {form.formState.errors.location_address && (
                                    <p className="text-xs font-medium text-destructive flex items-center gap-1 mt-1">
                                        <AlertCircle className="h-3 w-3" />
                                        {form.formState.errors.location_address.message}
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
                                        Publicar Donación
                                        <PlusCircle className="h-4 w-4" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
