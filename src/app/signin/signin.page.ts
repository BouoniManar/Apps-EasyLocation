import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/authentication.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  ionicForm!: FormGroup;

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private authService: AuthenticationService,
    private firestore: AngularFirestore,
    private router: Router,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')]],
      password: ['', Validators.required],
    });
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    if (this.ionicForm.valid) {
      try {
        const userCredential = await this.authService.loginUser(
          this.ionicForm.value.email,
          this.ionicForm.value.password
        );

        const userId = userCredential.user?.uid;
        if (userId) {
          const userDoc = await this.firestore.collection('users').doc(userId).get().toPromise();
          const userData: any = userDoc?.data();

          if (userData?.role === 'owner') {
            this.router.navigate(['/proprietaire']);
          } else {
            this.router.navigate(['/bienvenue']);
          }
        }

        loading.dismiss();
      } catch (err) {
        loading.dismiss();
        this.presentToast('Login failed. Please try again.'); 
      }
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'danger',
    });
    toast.present();
  }

  get errorControl() {
    return this.ionicForm.controls;
  }
}
