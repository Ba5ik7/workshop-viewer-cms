import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/shared/services/navigation/navigation.service';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  user = '';

  constructor(navigationService: NavigationService, private chatService: ChatService) {
    navigationService.sectionRouteSub.next('chat');
  }

  ngOnInit(): void {
  }

  connect() {
    if (this.user) {
      this.chatService.connect(this.user);
    }
  }
}
