import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.page.html',
  styleUrls: ['./favoris.page.scss'],
})
export class FavorisPage implements OnInit {
  favorites: any[] = [];

  constructor(private router: Router,private toastController: ToastController) {
    // Retrieve favorites passed from the BienvenuePage
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['favorites']) {
      this.favorites = navigation.extras.state['favorites'];
    }
  }

  ngOnInit() {}

  // Method to view ad details from favorites
  goToDetails(id: string) {
    this.router.navigate(['/details', id]);
  }
  removeFromFavorites(ad: any) {
    // Filter the favorites array to remove the selected ad
    this.favorites = this.favorites.filter(item => item.id !== ad.id);
    this.presentToast('Annonce retirée des favoris');
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
