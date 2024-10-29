// messaging.service.ts
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

  getConversationMessages(conversationId: string): Observable<Message[]> {
    return this.firestore.collection<Message>('messages', ref =>
      ref.where('conversationId', '==', conversationId)
         .orderBy('timestamp')
    ).valueChanges();
  }
}
