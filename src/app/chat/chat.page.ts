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
  content: string = '';
  senderId!: string; // Get this from the authenticated user context
  receiverId!: string; // Get this from route params or other context

  constructor(
    private messagingService: MessagingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Assume senderId is the current user's ID
    this.senderId = 'currentUserId'; // Replace with actual user ID
    this.receiverId = this.route.snapshot.paramMap.get('ownerId') || '';

    // Fetch messages
    this.messagingService.getMessages(this.senderId, this.receiverId).subscribe(messages => {
      this.messages = messages;
    });
  }

  sendMessage() {
    const message: Message = {
      senderId: this.senderId,
      receiverId: this.receiverId,
      content: this.content,
      timestamp: new Date()
    };

    this.messagingService.sendMessage(message).then(() => {
      this.content = ''; // Clear input field after sending
    });
  }
}
