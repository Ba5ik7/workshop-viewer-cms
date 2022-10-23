import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { NavigationService, filterNullish } from '../../../shared/services/navigation/navigation.service';

@Component({
  selector: 'workshop-detail',
  templateUrl: './workshop-detail.component.html',
  styleUrls: ['./workshop-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WorkshopDetailComponent implements OnInit, OnDestroy {

  destory: Subject<boolean> = new Subject();

  workshopDocument!: string;

  // MatPaginator Inputs
  length = 3;
  pageSize = 1;
  pageEvent!: PageEvent;

  @ViewChild('paginator', { static: true }) paginator!: any;

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
        .pipe(filterNullish(), take(1))
        .subscribe((category) => {
          this.workshopDocument = category.workshopDocuments[0]?._id;
        });
      }
    });
  }

  ngOnInit(): void {
    console.log({
      paginator: this.paginator
    });
  }

  ngOnDestroy(): void {
    this.destory.next(true);
  }

  pageEventChange(event: PageEvent) {
    console.log(event);
    this.pageEvent = event;
  }
}
