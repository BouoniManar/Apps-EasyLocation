import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; // Import ActivatedRoute to get the ID
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-edit-annonce',
  templateUrl: './edit-annonce.page.html',
  styleUrls: ['./edit-annonce.page.scss'],
})
export class EditAnnoncePage implements OnInit {
  adId: string | undefined; // Store the ad ID as undefined by default
  adForm!: FormGroup;

  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute, // To capture the ad ID from the route
    private router: Router,
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    const adIdParam = this.route.snapshot.paramMap.get('id');
    this.adId = adIdParam ? adIdParam : undefined; // Ensure adId is either a string or undefined
    this.initializeForm();
    if (this.adId) {
      this.loadAdDetails();
    }
  }

  initializeForm() {
    this.adForm = this.fb.group({
      title: ['', Validators.required],
      location: ['', Validators.required],
      price: ['', Validators.required],
      imageUrl: ['']
    });
  }

  async loadAdDetails() {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    // Fetch the ad data from Firestore using the ad ID
    this.firestore.collection('ads').doc(this.adId).valueChanges().subscribe((ad: any) => {
      if (ad) {
        this.adForm.patchValue(ad); // Populate the form with the ad data
      }
      loading.dismiss();
    }, error => {
      loading.dismiss();
      this.presentToast('Erreur lors du chargement de l\'annonce.');
    });
  }

  async updateAd() {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    if (this.adId) {

      this.firestore.collection('ads').doc(this.adId).update(this.adForm.value).then(async () => {
        loading.dismiss();
        const toast = await this.toastCtrl.create({
          message: 'Annonce modifiée avec succès!',
          duration: 2000,
          color: 'success'
        });
        toast.present();
        this.router.navigate(['/mes-annonces']);
      }).catch(async (error) => {
        loading.dismiss();
        this.presentToast('Erreur lors de la modification de l\'annonce.');
      });
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      color: 'danger',
    });
    toast.present();
  }
}
