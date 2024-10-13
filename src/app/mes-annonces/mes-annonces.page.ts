import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-mes-annonces',
  templateUrl: './mes-annonces.page.html',
  styleUrls: ['./mes-annonces.page.scss'],
})
export class MesAnnoncesPage implements OnInit {
  ads: any[] = []; // Array to store the ads

  constructor(
    private firestore: AngularFirestore,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private router: Router // Inject Router
  ) {}

  ngOnInit() {
    this.loadAds();
  }

  // Load ads from Firestore
  async loadAds() {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    this.firestore.collection('ads').valueChanges({ idField: 'id' }).subscribe((data) => {
      this.ads = data;
      loading.dismiss();
    }, async (error) => {
      loading.dismiss();
      const toast = await this.toastCtrl.create({
        message: 'Erreur lors du chargement des annonces.',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
    });
  }

  // Delete an ad from Firestore
  async deleteAd(adId: string) {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    this.firestore.collection('ads').doc(adId).delete().then(async () => {
      loading.dismiss();
      const toast = await this.toastCtrl.create({
        message: 'Annonce supprimée avec succès!',
        duration: 2000,
        color: 'success'
      });
      toast.present();
    }).catch(async (error) => {
      loading.dismiss();
      const toast = await this.toastCtrl.create({
        message: 'Erreur lors de la suppression de l\'annonce.',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
    });
  }



  editAd(adId: string) {
    this.router.navigate(['/edit-annonce', { id: adId }]);
  }
}
