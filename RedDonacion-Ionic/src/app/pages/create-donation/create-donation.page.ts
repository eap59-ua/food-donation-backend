import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DonationsService } from '../../services/donations.service';

@Component({
  selector: 'app-create-donation',
  templateUrl: './create-donation.page.html',
  styleUrls: ['./create-donation.page.scss'],
  standalone: false,
})
export class CreateDonationPage {
  form: FormGroup;
  isLoading = false;

  units = ['kg', 'g', 'litros', 'unidades', 'porciones', 'cajas', 'bolsas'];

  constructor(
    private fb: FormBuilder,
    private donationsService: DonationsService,
    private router: Router,
    private toastCtrl: ToastController
  ) {
    // Default expiry to 7 days from today
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      quantity: [null, [Validators.required, Validators.min(1)]],
      unit: ['kg', Validators.required],
      location_address: ['', Validators.required],
      expiry_date: [nextWeek.toISOString().split('T')[0]],
    });
  }

  get titleCtrl()    { return this.form.get('title')!; }
  get descCtrl()     { return this.form.get('description')!; }
  get quantityCtrl() { return this.form.get('quantity')!; }
  get locationCtrl() { return this.form.get('location_address')!; }
  get expiryCtrl()   { return this.form.get('expiry_date')!; }

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const formValues = this.form.value;
    const dto = {
      title: formValues.title,
      description: formValues.description,
      quantity: `${formValues.quantity} ${formValues.unit}`,
      location_address: formValues.location_address,
      expiration_date: formValues.expiry_date ? new Date(formValues.expiry_date).toISOString() : null,
    };

    this.donationsService.create(dto).subscribe({
      next: (donation) => {
        this.isLoading = false;
        this.showToast('¡Donación publicada con éxito!', 'success');
        this.router.navigate(['/donation-detail', donation.id], {
          replaceUrl: true,
        });
      },
      error: () => {
        this.isLoading = false;
        this.showToast('Error al publicar la donación', 'danger');
      },
    });
  }

  private async showToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2500,
      color,
      position: 'bottom',
    });
    await toast.present();
  }

  getTodayString(): string {
    return new Date().toISOString().split('T')[0];
  }
}
