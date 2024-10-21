import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../messaging.service';
import { Message } from '../models/Message';

@Component({
  selector: 'app-proprietaire-messages',
  templateUrl: './proprietaire-messages.page.html',
  styleUrls: ['./proprietaire-messages.page.scss'],
})
export class ProprietaireMessagesPage implements OnInit {
  messages: Message[] = [];
  ownerId: string = 'currentUserId'; // Set this to the actual current user's ID
  newMessageContent: string = ''; // For the input of the new message
  selectedReceiverId: string = ''; // The receiver's ID of the message being replied to

  constructor(private messagingService: MessagingService) {}

  ngOnInit() {
    // Fetch messages for the current owner
    this.messagingService.getMessagesForOwner(this.ownerId).subscribe(messages => {
      this.messages = messages;
    });
  }

  sendMessage() {
    const newMessage: Message = {
      senderId: this.ownerId,
      receiverId: this.selectedReceiverId, // Ensure this is set correctly
      content: this.newMessageContent,
      timestamp: new Date()
    };

    console.log('Sending message:', newMessage); // Log message object before sending

    this.messagingService.sendMessage(newMessage).then(() => {
      this.newMessageContent = ''; // Clear input after sending
    }).catch(error => {
      console.error('Error sending message:', error);
    });
  }

}
