import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/shared/services/navigation/navigation.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(navigationService: NavigationService) {
    navigationService.sectionRouteSub.next('settings');
  }
  ngOnInit(): void {
  }

}
