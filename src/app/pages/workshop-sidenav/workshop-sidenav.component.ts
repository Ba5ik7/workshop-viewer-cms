import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { NavigationService } from 'src/app/shared/services/navigation/navigation.service';

@Component({
  selector: 'workshop-sidenav',
  templateUrl: './workshop-sidenav.component.html',
  styleUrls: ['./workshop-sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WorkshopSidenavComponent implements OnDestroy {

  @ViewChild('sidenav') sidenav!: MatSidenav;

  isScreenSmall: Observable<boolean>;
  destory: Subject<boolean> = new Subject();

  navList!: Observable<any[]>;
  section = 'Something';

  constructor(breakpoints: BreakpointObserver, navigationService: NavigationService) {

    this.isScreenSmall = breakpoints.observe(`(max-width: 959px)`)
    .pipe(takeUntil(this.destory), map(breakpoint => breakpoint.matches));

    this.navList = navigationService.sections$;
  }

  ngOnDestroy(): void {
    this.destory.next(true);
  }

  toggleSideNav() {
    this.sidenav.toggle();
  }
}
