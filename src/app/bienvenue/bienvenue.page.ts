import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Ad } from '../models/ad';

@Component({
  selector: 'app-bienvenue',
  templateUrl: './bienvenue.page.html',
  styleUrls: ['./bienvenue.page.scss'],
})
export class BienvenuePage implements OnInit {
  favorites: any[] = [];
  ads$!: Observable<Ad[]>;
  allAds: Ad[] = [];
  filteredAds: Ad[] = [];
  searchLocation: string = '';

  constructor(
    private alertController: AlertController,
    private router: Router,
    private firestore: AngularFirestore,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.fetchAds();
  }

  fetchAds() {
    this.ads$ = this.firestore.collection<Ad>('ads').valueChanges({ idField: 'id' });
    this.ads$.subscribe(ads => {
      this.allAds = ads;
      this.filteredAds = ads;
      console.log("Fetched ads:", ads);
    });
  }

  filterAds(event: any) {
    this.searchLocation = event.target.value.toLowerCase().trim();

    if (this.searchLocation) {
      this.filteredAds = this.allAds.filter(ad =>
        ad.location.toLowerCase().includes(this.searchLocation)
      );
    } else {
      this.filteredAds = this.allAds;
    }

    console.log("Filtered ads:", this.filteredAds);
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

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });

    await toast.present();
  }

  addToFavoris(ad: any) {
    ad.isFavorite = !ad.isFavorite;

    if (ad.isFavorite) {
      this.favorites.push(ad);
      this.presentToast('Ajouté aux favoris');
    } else {
      this.favorites = this.favorites.filter(favorite => favorite.id !== ad.id);
      this.presentToast('Retiré des favoris');
    }
  }

  goToFavoris() {
    this.router.navigate(['/favoris'], { state: { favorites: this.favorites } });
  }

  async logout() {
   this.router.navigate(["/home"]);
  }

goToChat(){
  this.router.navigate(['/chat'])
}

}
