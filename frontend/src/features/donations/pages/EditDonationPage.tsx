import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { AlertCircle, Loader2, Save, ArrowLeft } from 'lucide-react';
import { donationsApi } from '../api/donations';
import { useEffect } from 'react';

const editDonationSchema = z.object({
    title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
    description: z.string().optional(),
    quantity: z.string().min(1, 'La cantidad es obligatoria'),
    location_address: z.string().min(3, 'La dirección es obligatoria'),
    expiration_date: z.string().optional(),
});

type EditDonationFormValues = z.infer<typeof editDonationSchema>;

export const EditDonationPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data: donation, isLoading: isLoadingDonation } = useQuery({
        queryKey: ['donation', id],
        queryFn: () => donationsApi.getById(id!),
        enabled: !!id,
    });

    const form = useForm<EditDonationFormValues>({
        resolver: zodResolver(editDonationSchema),
        defaultValues: { title: '', description: '', quantity: '', location_address: '', expiration_date: '' },
    });

    useEffect(() => {
        if (donation) {
            form.reset({
                title: donation.title,
                description: donation.description ?? '',
                quantity: donation.quantity,
                location_address: donation.location_address,
                expiration_date: donation.expiration_date
                    ? new Date(donation.expiration_date).toISOString().slice(0, 16)
                    : '',
            });
        }
    }, [donation, form]);

    const mutation = useMutation({
        mutationFn: (data: EditDonationFormValues) =>
            donationsApi.update(id!, {
                ...data,
                expiration_date: data.expiration_date || undefined,
            }),
        onSuccess: () => {
            navigate(`/donations/${id}`);
        },
    });

    const onSubmit = (data: EditDonationFormValues) => {
        mutation.mutate(data);
    };

    if (isLoadingDonation) {
        return (
            <div className="min-h-screen pt-24 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 bg-muted/20 px-4">
            <div className="w-full max-w-2xl mx-auto">
                <Link
                    to={`/donations/${id}`}
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Volver al detalle
                </Link>

                <div className="bg-background rounded-2xl shadow-sm border border-border overflow-hidden">
                    <div className="p-8">
                        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Editar Donación</h1>
                        <p className="text-muted-foreground mb-8">Modifica los datos de tu donación</p>

                        {mutation.isError && (
                            <div className="mb-6 bg-destructive/10 text-destructive text-sm font-medium p-4 rounded-lg flex items-start gap-3">
                                <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                                <span>No se pudo actualizar la donación. Verifica que seas el propietario.</span>
                            </div>
                        )}

                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-foreground">Título *</label>
                                <input
                                    {...form.register('title')}
                                    type="text"
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
                                        Guardar Cambios
                                        <Save className="h-4 w-4" />
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
