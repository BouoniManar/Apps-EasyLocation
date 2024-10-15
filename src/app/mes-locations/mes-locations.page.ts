import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { Observable } from 'rxjs';
import { Ad } from '../models/ad';

@Component({
  selector: 'app-mes-locations',
  templateUrl: './mes-locations.page.html',
  styleUrls: ['./mes-locations.page.scss'],
})
export class MesLocationsPage implements OnInit {
  ads!: Observable<Ad[]>;

  constructor(
    private firestore: AngularFirestore,
    private router: Router,
    private authService: AuthenticationService // Injectez le service
  ) {}

  async ngOnInit() {
    await this.fetchAds(); // Attendez que les annonces soient récupérées
  }

  async fetchAds() {
    const userId = await this.authService.getCurrentUserId(); // Récupérez l'ID de l'utilisateur courant
    if (userId) {
      this.ads = this.firestore.collection<Ad>('ads', ref => ref.where('userId', '==', userId)).valueChanges({ idField: 'id' });
    } else {
      console.error('User not authenticated');
    }
  }

  goToDetails(id: string) {
    this.router.navigate(['/details', id]);
  }
}
