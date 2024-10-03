import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  ionicForm!: FormGroup;  // Changed from loginForm to ionicForm

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private authService: AuthenticationService,
    private router: Router,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$'),  // escaped special characters
        ],
      ],
      password: [
        '',
        [Validators.required],
      ],
    });
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    if (this.ionicForm?.valid) {  // Updated form reference to ionicForm
      try {
        const user = await this.authService.loginUser(
          this.ionicForm.value.email,  // Updated form control reference
          this.ionicForm.value.password  // Updated form control reference
        );
        if (user) {
          loading.dismiss();
          this.router.navigate(['/home']);
        }
      } catch (err: unknown) {  // Explicitly declaring err as unknown
        loading.dismiss();

        // Convert err to a string and pass it to presentToast
        const errorMessage = err instanceof Error ? err.message : String(err);
        this.presentToast(errorMessage);
      }
    } else {
      console.log('Please provide all the required values!');
    }
  }

  // Define the presentToast method to display error messages
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'danger',
    });
    toast.present();
  }

  get errorControl() {
    return this.ionicForm?.controls;  // Updated to reference ionicForm
  }
}
