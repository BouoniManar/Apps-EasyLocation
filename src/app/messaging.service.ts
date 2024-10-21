import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Message } from './models/Message';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  constructor(private firestore: AngularFirestore) {}

  sendMessage(message: Message) {
    return this.firestore.collection('messages').add(message);
  }

  getMessages(senderId: string, receiverId: string): Observable<Message[]> {
    return this.firestore.collection<Message>('messages', ref =>
      ref.where('senderId', 'in', [senderId, receiverId])
         .where('receiverId', 'in', [senderId, receiverId])
         .orderBy('timestamp')
    ).valueChanges();
  }
  getMessagesForOwner(ownerId: string): Observable<Message[]> {
    return this.firestore.collection<Message>('messages', ref =>
      ref.where('receiverId', '==', ownerId)
         .orderBy('timestamp')
    ).valueChanges();
  }
}
