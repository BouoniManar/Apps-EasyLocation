// chat.page.ts (Composant pour le locataire)
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessagingService } from '../messaging.service';
import { Message } from '../models/Message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  messages: Message[] = [];
  newMessageContent: string = '';
  senderId: string = 'currentTenantUserId'; 
  receiverId: string = ''; // ID du propriétaire
  conversationId: string = ''; // ID de la conversation

  constructor(
    private messagingService: MessagingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.conversationId = this.route.snapshot.paramMap.get('conversationId') || '';
    this.receiverId = this.route.snapshot.paramMap.get('ownerId') || '';
    this.loadMessages();
  }

  loadMessages() {
    this.messagingService.getConversationMessages(this.conversationId).subscribe(messages => {
      this.messages = messages;
    });
  }

  sendMessage() {
    const newMessage: Message = {
      senderId: this.senderId,
      receiverId: this.receiverId,
      content: this.newMessageContent,
      timestamp: new Date(),
      conversationId: this.conversationId
    };

    this.messagingService.sendMessage(newMessage).then(() => {
      this.messages.push(newMessage);
      this.newMessageContent = '';
    });
  }
}
