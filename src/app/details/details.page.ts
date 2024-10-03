import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular'; // Import AlertController

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  adId?: string = '';
  ad: any; // Variable for storing ad details
  adImages: string[] = [
    'https://www.mubawab-media.com/ad/7/952/439F/m/1_78245919.jpg',
    'https://www.mubawab-media.com/ad/8/003/242F/m/457463434_864117485251146_2981280704814568999_n_78892590.jpg'
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    // Get the ad ID from the route parameters
    this.adId = this.route.snapshot.paramMap.get('id') || '';
    // Load ad details based on the ID
    this.loadAdDetails(this.adId);
  }

  loadAdDetails(id: string) {
    // Simulated list of ads (replace this with actual data fetching logic)
    const ads = [
      {
        id: '1',
        title: 'A louer villa de maître 12 pièces sup 750...',
        imageUrl: "https://www.mubawab-media.com/ad/7/952/439F/m/1_78245919.jpg",
        rooms: 3,
        size: 120,
        location: 'à Ariana Ville',
        price: 750,
        describe: 'La maison de l’immobilier vous propose la location d’une villa de maître à usage habitation ou bureautique ,située dans un quartier résidentiel à Menzah_5.'
      },
      {
        id: '2',
        title: 'Appartement à louer, 3 pièces sup 120...',
        imageUrl: 'https://www.mubawab-media.com/ad/8/003/242F/m/457463434_864117485251146_2981280704814568999_n_78892590.jpg',
        rooms: 3,
        size: 120,
        location: 'Centre-ville Tunis',
        price: 500,
        describe: 'appartement en location à saisir. prix 4 500 tnd. 5 chambres à coucher, 6 salles de bains, 400 m². moins de 20 ans. type de sol: marbre. parfaitement équipé avec porte blindée, chauffage central et double.'
      },
      {
        id: '3',
        title: 'Centre d\'affaire 5* Business Plaza Center',
        imageUrl: 'https://www.mubawab-media.com/promotion/4/092F/pictures/m/Facade_77477088.jpg',
        rooms: 0,
        size: 0,
        location: 'Charguia 2 à La Soukra',
        price: 12500,
        describe: 'Un étage de villa de 180m à louer à usage bureautique à Ariana, se compose d’un grand salon et un hall, 3 chambres à coucher dont une avec un placard, salle de bain, salle d’eau, cuisine avec placard et avec séchoir. Climatisation et chauffage centrale.'
      },
      {
        id: '4',
        title: 'Etage de Villa S3 spacieux pour des expat...',
        imageUrl: 'https://www.mubawab-media.com/ad/8/002/004F/h/IMG_8170_78878680.jpeg',
        location: 'El Menzah 5 à Ariana Ville',
        price: 1000,
        describe: 'Le Business Plaza Center est un projet de centre d\'affaires moderne et polyvalent, idéalement situé à Charguia 2, à seulement 2 minutes de l\'aéroport Tunis Carthage et à 10 minutes du centre-ville.',
        rooms: 3,
        size: 230,
      }
    ];

    this.ad = ads.find(ad => ad.id === id);

    if (!this.ad) {
      console.error('Annonce non trouvée');
    }
  }

  // Function to show an alert
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Vous devez être connecté',
      message: 'Pour ajouter cette annonce à vos favoris, veuillez vous connecter.',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
            this.router.navigate(['/detail']);
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

  goToSignin() {
    this.router.navigate(['/login']);
  }
}
