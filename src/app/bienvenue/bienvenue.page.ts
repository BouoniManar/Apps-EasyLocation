import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthenticationService } from '../authentication.service';



@Component({
  selector: 'app-bienvenue',
  templateUrl: 'bienvenue.page.html',
  styleUrls: ['bienvenue.page.scss'],
})
export class BienvenuePage {
//tableau d'annonce
favorites: any[] = [];

  ads = [
    {
      id: '1',
      title: 'A louer villa de maître 12 pièces sup 750...',
      imageUrl: "https://www.mubawab-media.com/ad/7/952/439F/m/1_78245919.jpg",
      location: 'à Ariana Ville',
      price: 750,
      isFavorite: false
    },

    {
      id: '2',
      title: 'Appartement à louer, 3 pièces sup 120...',
      imageUrl: 'https://www.mubawab-media.com/ad/8/003/242F/m/457463434_864117485251146_2981280704814568999_n_78892590.jpg',
      location: 'Centre-ville Tunis',
      price: 500,
      isFavorite: false
    },
    {
      id: '3',
      title: 'Centre d\'affaire 5* Business Plaza Center',
      imageUrl: 'https://www.mubawab-media.com/promotion/4/092F/pictures/m/Facade_77477088.jpg',
      location: 'Charguia 2 à La Soukra',
      price: 12500,
      isFavorite: false
    },
    {
      id: '4',
      title: 'Etage de Villa S3 spacieux pour des expat...',
      imageUrl: 'https://www.mubawab-media.com/ad/8/002/004F/h/IMG_8170_78878680.jpeg',
      location: 'El Menzah 5 à Ariana Ville',
      price: 1000,
      isFavorite: false
    }
  ];

  constructor(private alertController: AlertController,private toastController: ToastController,private router: Router, public authService:AuthenticationService) {} // Injectez le Router

  goToDetails(id: string) {
    // Naviguer vers la page de détails de l'annonce
    this.router.navigate(['/details', id]);
  }




  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Vous devez être connecté',
      message: 'Pour ajouter cette annonce à vos favoris, veuillez vous connecter.',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
            // Navigate to the home page when "Annuler" is clicked
            this.router.navigate(['/home']);
            console.log('Annuler clicked, navigating to home.');
          }
        },
        {
          text: 'Je me connecter',
          handler: () => {
            this.router.navigate(['/signin']);
          }
        }
      ]
    });

    await alert.present();
  }

  async logout() {
    try {
      await this.authService.signOut();
      this.presentToast('Vous êtes déconnecté avec succès.');
      this.router.navigate(['/signin']);
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      this.presentToast('Erreur lors de la déconnexion. Veuillez réessayer.');
    }
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
    ad.isFavorite = !ad.isFavorite;  // Toggle the favorite status

    // Add to or remove from the favorites array
    if (ad.isFavorite) {
      this.favorites.push(ad);
      this.presentToast('Ajouté aux favoris');
    } else {
      // Remove the ad from the favorites array
      this.favorites = this.favorites.filter(favorite => favorite.id !== ad.id);
      this.presentToast('Retiré des favoris');
    }
  }
  
  goToFavoris() {
    this.router.navigate(['/favoris'], { state: { favorites: this.favorites } });
  }


}
