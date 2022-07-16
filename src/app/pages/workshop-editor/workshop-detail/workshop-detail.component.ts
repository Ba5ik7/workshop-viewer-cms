import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { NavigationService, filterNullish } from '../../../shared/services/navigation/navigation.service';

@Component({
  selector: 'workshop-detail',
  templateUrl: './workshop-detail.component.html',
  styleUrls: ['./workshop-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WorkshopDetailComponent implements OnDestroy {

  destory: Subject<boolean> = new Subject();

  workshopDocument!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService
  ) {    
    this.activatedRoute.params
    .pipe(takeUntil(this.destory))
    .subscribe((data) => {
      this.navigationService.categoryRouteSub.next(data['categoryId']);
      if(data['workshopId']) {
        this.workshopDocument = data['workshopId'];
      } else {
        this.navigationService.category$
        .pipe(take(1), filterNullish())
        .subscribe((category) => {
          this.workshopDocument = category.workshopDocuments[0]?._id;
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.destory.next(true);
  }
}
