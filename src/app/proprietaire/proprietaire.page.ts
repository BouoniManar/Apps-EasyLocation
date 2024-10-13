import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Ad } from '../models/ad';

@Component({
  selector: 'app-proprietaire',
  templateUrl: './proprietaire.page.html',
  styleUrls: ['./proprietaire.page.scss'],
})
export class ProprietairePage implements OnInit {
  ads!: Observable<Ad[]>;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.fetchAds();
  }

  fetchAds() {

    this.ads = this.firestore.collection<Ad>('ads').valueChanges({ idField: 'id' });
  }

  goToDetails(id: string) {
    this.router.navigate(['/details', id]);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Vous devez être connecté',
      message: 'Veuillez vous connecter pour ajouter cette annonce à vos favoris.',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
            this.router.navigate(['/home']);
          },
        },
        {
          text: 'Je me connecter',
          handler: () => {
            this.router.navigate(['/signin']);
          },
        },
      ],
    });
    await alert.present();

  }

}
