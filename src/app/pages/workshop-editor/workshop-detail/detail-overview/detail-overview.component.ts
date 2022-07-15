import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { NavigationService } from 'src/app/shared/services/navigation/navigation.service';

@Component({
  selector: 'app-detail-overview',
  templateUrl: './detail-overview.component.html',
  styleUrls: ['./detail-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailOverviewComponent implements OnDestroy {

  destory: Subject<boolean> = new Subject();

  constructor(private activatedRoute: ActivatedRoute, private navigationService: NavigationService) {    
    this.activatedRoute.params
    .pipe(takeUntil(this.destory))
    .subscribe((data) => this.navigationService.categoryRouteSub.next(data['categoryId']));
  }

  ngOnDestroy(): void {
    this.destory.next(true);
  }
}
