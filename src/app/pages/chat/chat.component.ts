import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavigationService } from 'src/app/shared/services/navigation/navigation.service';
import { ChatAppData, ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  message = '';
  user = '';
  chatAppData$!: Observable<ChatAppData>;

  constructor(navigationService: NavigationService, private chatService: ChatService) {
    navigationService.sectionRouteSub.next('chat');
  }

  ngOnInit(): void {
    this.chatAppData$ = this.chatService.getChatAppData();
  }

  sendMessage() {
    if (this.message) {
      this.chatService.sendMessage(this.message);
      this.message = '';
    }
  }
}
