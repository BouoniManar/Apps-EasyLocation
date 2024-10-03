import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  ionicForm!: FormGroup;

  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController,
    private authService: AuthenticationService,
    private router: Router,
    public formBuilder: FormBuilder,
    private alertController: AlertController // Inject AlertController
  ) {}

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&].{8,}'),
        ],
      ],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  get errorControl() {
    return this.ionicForm?.controls;
  }

  async signUp() {
    const loading = await this.loadingController.create();
    await loading.present();

    if (this.ionicForm.valid) {
      try {
        const user = await this.authService.registerUser(
          this.ionicForm.value.email,
          this.ionicForm.value.password
        );
        if (user) {
          loading.dismiss();
          this.presentSuccessAlert();  // Call alert method on success
        }
      } catch (err) {
        loading.dismiss();
        this.presentToast('Registration failed. Please try again.');
      }
    }
  }

  async presentSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Inscription réussie',
      message: 'Votre inscription a été effectuée avec succès.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/success']); // Navigate to success page
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'danger',
    });
    toast.present();
  }
}
