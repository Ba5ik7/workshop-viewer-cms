import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/shared/services/navigation/navigation.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(navigationService: NavigationService) {
    navigationService.sectionRouteSub.next('chat');
  }

  ngOnInit(): void {
  }

}
