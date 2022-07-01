import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { NavigationService } from 'src/app/shared/services/navigation/navigation.service';

@Component({
  selector: 'workshop-sidenav',
  templateUrl: './workshop-sidenav.component.html',
  styleUrls: ['./workshop-sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WorkshopSidenavComponent implements OnDestroy {

  destory: Subject<boolean> = new Subject();

  navList!: Observable<any[]>;
  section = 'Something';

  constructor(navigationService: NavigationService) {
    this.navList = navigationService.sections$;
  }

  ngOnDestroy(): void {
    this.destory.next(true);
  }
}
