import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { distinct, Observable, Subject, takeUntil } from 'rxjs';
import { NavigationService } from 'src/app/shared/services/navigation/navigation.service';

@Component({
  selector: 'app-workshop-editor',
  templateUrl: './workshop-editor.component.html',
  styleUrls: ['./workshop-editor.component.scss']
})
export class WorkshopEditorComponent implements OnInit, OnDestroy {

  
  destory: Subject<boolean> = new Subject();

  categories!: Observable<any[]>;

  constructor(activatedRoute: ActivatedRoute, navigationService: NavigationService) {
    activatedRoute.params
    .pipe(takeUntil(this.destory), distinct())
    .subscribe(params => navigationService.sectionRouteSub.next(params['section']));

    this.categories = navigationService.sectionNavList$;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destory.next(true);
  }
}
