// proprietaire-messages.page.ts (Composant pour le propriétaire)
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessagingService } from '../messaging.service';
import { Message } from '../models/Message';

@Component({
  selector: 'app-proprietaire-messages',
  templateUrl: './proprietaire-messages.page.html',
  styleUrls: ['./proprietaire-messages.page.scss'],
})
export class ProprietaireMessagesPage implements OnInit {
  messages: Message[] = [];
  newMessageContent: string = '';
  senderId: string = 'currentOwnerUserId';
  receiverId: string = '';
  conversationId: string = ''; 

  constructor(
    private messagingService: MessagingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.conversationId = this.route.snapshot.paramMap.get('conversationId') || '';
    this.receiverId = this.route.snapshot.paramMap.get('tenantId') || '';
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
