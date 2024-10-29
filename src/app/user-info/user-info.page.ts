import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.page.html',
  styleUrls: ['./user-info.page.scss'],
})


export class UserInfoPage implements OnInit {
  selectedImage: string | ArrayBuffer | null = null;
  imageFile: File | null = null;
  user: any = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(
    private storage: AngularFireStorage,
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
    private toastController: ToastController,
  ) {}

  ngOnInit() {
    this.loadUserInfo();
  }

  async loadUserInfo() {
    const user = await this.auth.currentUser;
    if (user) {
      this.user.name = user.displayName || '';
      this.user.email = user.email || '';
      this.selectedImage = user.photoURL || 'https://ionicframework.com/docs/img/demos/avatar.svg';
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  async saveUserInfo() {
    const user = await this.auth.currentUser;
    if (!user) {
        this.presentToast("User not authenticated.");
        return;
    }

    if (this.user.password !== this.user.confirmPassword) {
        this.presentToast("Passwords do not match!");
        return;
    }

    try {
        await user.updateProfile({
            displayName: this.user.name,
        });

        if (this.user.email !== user.email) {
            try {
                await user.updateEmail(this.user.email);
                await user.sendEmailVerification();
                this.presentToast("A verification email has been sent. Please verify your email.");
                return;
            } catch (error) {
                console.error("Error updating email:", error);
                this.presentToast("Error updating email. Please verify your new email.");
                return;
            }
        }


        if (this.user.password) {
            await user.updatePassword(this.user.password);
        }


        if (this.imageFile) {
            const filePath = `users/${user.uid}/profile_picture`;
            const fileRef = this.storage.ref(filePath);
            const task = this.storage.upload(filePath, this.imageFile);


            task.snapshotChanges().pipe(
                finalize(async () => {
                    const downloadURL = await fileRef.getDownloadURL().toPromise();
                    await user.updateProfile({ photoURL: downloadURL });


                    await this.firestore.collection('users').doc(user.uid).set({
                        name: this.user.name,
                        email: this.user.email,
                        photoURL: downloadURL
                    }, { merge: true });
                    this.presentToast("Profile updated successfully!");
                })
            ).subscribe();
        } else {

            await this.firestore.collection('users').doc(user.uid).set({
                name: this.user.name,
                email: this.user.email
            }, { merge: true });
            this.presentToast("Profile updated successfully!");
        }
    } catch (error) {
        console.error("Error updating profile:", error);
        this.presentToast("Error updating profile.");
    }
}


  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
    toast.present();
  }
}
