import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavigationService } from 'src/app/shared/services/navigation/navigation.service';
import { ChatAppData, ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  user = '';
  chatAppData$!: Observable<ChatAppData>;

  constructor(navigationService: NavigationService, private chatService: ChatService) {
    navigationService.sectionRouteSub.next('chat');
  }

  ngOnInit(): void {
    this.chatAppData$ = this.chatService.getChatAppData();
  }
}
