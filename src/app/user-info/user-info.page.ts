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
  imageFile: File | null = null; // Store selected file
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

  // Load user info from Firebase Auth
  async loadUserInfo() {
    const user = await this.auth.currentUser;
    if (user) {
      this.user.name = user.displayName || '';
      this.user.email = user.email || '';
      this.selectedImage = user.photoURL || 'https://ionicframework.com/docs/img/demos/avatar.svg';
    }
  }

  // When the file is selected
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file; // Store the file
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
        // Update profile information in Firebase Authentication
        await user.updateProfile({
            displayName: this.user.name,
        });

        // Check if email has changed
        if (this.user.email !== user.email) {
            try {
                // Update email
                await user.updateEmail(this.user.email);
                // Send verification email
                await user.sendEmailVerification();
                this.presentToast("A verification email has been sent. Please verify your email.");
                return; // Stop execution here after sending verification
            } catch (error) {
                console.error("Error updating email:", error);
                this.presentToast("Error updating email. Please verify your new email.");
                return; // Stop execution if there was an error
            }
        }

        // Update password if provided
        if (this.user.password) {
            await user.updatePassword(this.user.password);
        }

        // Upload image if a new image is selected
        if (this.imageFile) {
            const filePath = `users/${user.uid}/profile_picture`;
            const fileRef = this.storage.ref(filePath);
            const task = this.storage.upload(filePath, this.imageFile);

            // Wait for the file to be uploaded
            task.snapshotChanges().pipe(
                finalize(async () => {
                    const downloadURL = await fileRef.getDownloadURL().toPromise();
                    await user.updateProfile({ photoURL: downloadURL });

                    // Save additional data to Firestore
                    await this.firestore.collection('users').doc(user.uid).set({
                        name: this.user.name,
                        email: this.user.email,
                        photoURL: downloadURL
                    }, { merge: true }); // Use merge to avoid overwriting the entire document
                    this.presentToast("Profile updated successfully!");
                })
            ).subscribe();
        } else {
            // Save additional data to Firestore (without new image)
            await this.firestore.collection('users').doc(user.uid).set({
                name: this.user.name,
                email: this.user.email
            }, { merge: true }); // Use merge to avoid overwriting the entire document
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
