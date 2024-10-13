import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  email: string = '';

  constructor(
    private authService: AuthenticationService,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {}

  async reset() {
    if (!this.email || this.email.trim() === '') {
      this.presentToast('Veuillez entrer une adresse e-mail valide');
      return;
    }

    try {
      await this.authService.resetPassword(this.email);
      console.log('Email de réinitialisation envoyé');
      this.presentToast('Votre lien de réinitialisation de mot de passe a été envoyé');
    } catch (error) {
      console.error('Erreur lors de l\'envoi du lien de réinitialisation:', error);
      this.presentToast('Une erreur s\'est produite. Veuillez réessayer.');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });

    await toast.present();
    toast.onDidDismiss().then(() => {
      if (message.includes('envoyé')) {
        this.router.navigate(['/signin']);  
      }
    });
  }
}
