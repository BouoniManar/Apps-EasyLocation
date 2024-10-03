import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Ajoutez cette ligne
import { AlertController } from '@ionic/angular'; // Import AlertController



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
//tableau d'annonce


  ads = [
    {
      id: '1',
      title: 'A louer villa de maître 12 pièces sup 750...',
      imageUrl: "https://www.mubawab-media.com/ad/7/952/439F/m/1_78245919.jpg",
      location: 'à Ariana Ville',
      price: 750
    },

    {
      id: '2',
      title: 'Appartement à louer, 3 pièces sup 120...',
      imageUrl: 'https://www.mubawab-media.com/ad/8/003/242F/m/457463434_864117485251146_2981280704814568999_n_78892590.jpg',
      location: 'Centre-ville Tunis',
      price: 500
    },
    {
      id: '3',
      title: 'Centre d\'affaire 5* Business Plaza Center',
      imageUrl: 'https://www.mubawab-media.com/promotion/4/092F/pictures/m/Facade_77477088.jpg',
      location: 'Charguia 2 à La Soukra',
      price: 12500
    },
    {
      id: '4',
      title: 'Etage de Villa S3 spacieux pour des expat...',
      imageUrl: 'https://www.mubawab-media.com/ad/8/002/004F/h/IMG_8170_78878680.jpeg',
      location: 'El Menzah 5 à Ariana Ville',
      price: 1000
    }
  ];

  constructor(private alertController: AlertController,private router: Router) {} // Injectez le Router

  goToDetails(id: string) {
    // Naviguer vers la page de détails de l'annonce
    this.router.navigate(['/details', id]); // Modifiez le chemin selon votre configuration de routes
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

  goToSignin(){

  }
}
