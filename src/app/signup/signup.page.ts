import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Firestore import
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
    private firestore: AngularFirestore, // Inject Firestore service
    public formBuilder: FormBuilder,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$'), // Email pattern validation
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&].{8,}'), // Password validation
        ],
      ],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required], // User role selection
    });
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  async signUp() {
    const loading = await this.loadingController.create(); // Create loading indicator
    await loading.present(); // Show loading indicator

    if (this.ionicForm.valid) {
      try {
        // Register user with Firebase Authentication
        const userCredential = await this.authService.registerUser(
          this.ionicForm.value.email,
          this.ionicForm.value.password
        );

        // Get user ID and store additional user info (role) in Firestore
        const userId = userCredential.user?.uid;
        if (userId) {
          await this.firestore.collection('users').doc(userId).set({
            email: this.ionicForm.value.email,
            role: this.ionicForm.value.role // Store role in Firestore
          });
        }

        loading.dismiss(); // Dismiss loading
        this.presentSuccessAlert(); // Show success alert
      } catch (err) {
        loading.dismiss(); // Dismiss loading on error
        this.presentToast('Registration failed. Please try again.'); // Show error message
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
            this.router.navigate(['/signin']); // Redirect to Sign-In page
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
      color: 'danger', // Display error in red
    });
    toast.present();
  }
}
