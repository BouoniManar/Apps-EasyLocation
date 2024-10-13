import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoadingController, ToastController } from '@ionic/angular';



@Component({
  selector: 'app-ajout-annonce',
  templateUrl: './ajout-annonce.page.html',
  styleUrls: ['./ajout-annonce.page.scss'],
})
export class AjoutAnnoncePage implements OnInit {
  adForm!: FormGroup; // Use definite assignment assertion

  constructor(
    private fb: FormBuilder,
    private firestore: AngularFirestore,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.adForm = this.fb.group({
      title: ['', Validators.required],
      location: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]], // Ensure price is a positive number
      imageUrl: ['']
    });
  }

async addAd() {
      const loading = await this.loadingCtrl.create();
      await loading.present();

      // Save ad to Firestore
      this.firestore.collection('ads').add(this.adForm.value)
        .then(async () => {
          loading.dismiss();
          const toast = await this.toastCtrl.create({
            message: 'Annonce ajoutée avec succès!',
            duration: 2000,
            color: 'success'
          });
          toast.present();
          this.adForm.reset(); // Reset form after successful submission
        })
        .catch(async (error) => {
          loading.dismiss();
          const toast = await this.toastCtrl.create({
            message: "Erreur lors de l'ajout de l'annonce.",
            duration: 2000,
            color: 'danger'
          });
          toast.present();
          console.error('Error adding ad: ', error);
        });
    }
  }

