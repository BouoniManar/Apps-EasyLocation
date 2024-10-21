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
  favorites: any[] = [];  // Array to store favorite ads
  ads$!: Observable<Ad[]>;  // Observable for ads
  allAds: Ad[] = [];  // Array to store all fetched ads
  filteredAds: Ad[] = [];  // Array to store filtered ads
  searchLocation: string = '';  // Variable for location search

  constructor(
    private alertController: AlertController,
    private router: Router,
    private firestore: AngularFirestore,
    private toastController: ToastController  // Inject ToastController for notifications
  ) {}

  ngOnInit() {
    this.fetchAds();  // Fetch ads when the component is initialized
  }

  fetchAds() {
    // Fetch ads from Firestore and listen for real-time updates
    this.ads$ = this.firestore.collection<Ad>('ads').valueChanges({ idField: 'id' });
    this.ads$.subscribe(ads => {
      this.allAds = ads;  // Store all ads
      this.filteredAds = ads;  // Initially, display all ads
      console.log("Fetched ads:", ads);  // Debugging log
    });
  }

  // Efficient filtering method
  filterAds(event: any) {
    this.searchLocation = event.target.value.toLowerCase().trim();  // Update search variable

    if (this.searchLocation) {
      // Filter ads based on location
      this.filteredAds = this.allAds.filter(ad =>
        ad.location.toLowerCase().includes(this.searchLocation)
      );
    } else {
      // If no search term, reset filteredAds to show all ads
      this.filteredAds = this.allAds;
    }

    console.log("Filtered ads:", this.filteredAds);  // Debugging log
  }



  // Method to navigate to the ad details page
  goToDetails(id: string) {
    this.router.navigate(['/details', id]);  // Navigate to the details page with the ad's ID
  }

  // Method to present an alert when a user attempts to add a favorite without being logged in
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Vous devez être connecté',
      message: 'Veuillez vous connecter pour ajouter cette annonce à vos favoris.',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
            this.router.navigate(['/home']);  // Navigate back to home on cancel
          },
        },
        {
          text: 'Je me connecter',
          handler: () => {
            this.router.navigate(['/signin']);  // Navigate to sign-in page
          },
        },
      ],
    });
    await alert.present();  // Present the alert
  }

  // Method to present a toast notification
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });

    await toast.present();
  }

  // Add or remove an ad from favorites
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

  // Navigate to favorites page
  goToFavoris() {
    this.router.navigate(['/favoris'], { state: { favorites: this.favorites } });
  }

  // Method to logout
  async logout() {
   this.router.navigate(["/home"]);
  }

goToChat(){
  this.router.navigate(['/chat'])
}

}
