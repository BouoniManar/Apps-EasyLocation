import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Firebase Firestore
import { AlertController } from '@ionic/angular'; // For alerting the user

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  adId?: string | null; // Update the type to handle null
  ad: any; // To store the ad details

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firestore: AngularFirestore, // Firestore service
    private alertController: AlertController
  ) {}

  ngOnInit() {
    // Add a fallback for null values
    this.adId = this.route.snapshot.paramMap.get('id') || undefined;
    if (this.adId) {
      this.loadAdDetails(this.adId); // Load the ad details
    }
  }

  // Fetch ad details from Firestore using the ad ID
  loadAdDetails(id: string) {
    this.firestore.collection('ads').doc(id).valueChanges().subscribe(ad => {
      this.ad = ad;
    }, error => {
      console.error('Erreur lors du chargement de l\'annonce:', error);
    });
  }

  // Alert function if the user is not logged in when adding to favorites
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Vous devez être connecté',
      message: 'Veuillez vous connecter pour ajouter cette annonce à vos favoris.',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
            this.router.navigate(['/home']); // Navigate back to home
          }
        },
        {
          text: 'Je me connecter',
          handler: () => {
            this.router.navigate(['/signin']); // Navigate to sign-in
          }
        }
      ]
    });
    await alert.present();
  }
}
