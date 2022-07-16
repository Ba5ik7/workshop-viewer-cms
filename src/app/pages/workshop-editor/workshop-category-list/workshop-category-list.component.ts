import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Category } from 'src/app/shared/interfaces/category.interface';
import { NavigationService } from 'src/app/shared/services/navigation/navigation.service';

@Component({
  selector: 'app-workshop-category-list',
  templateUrl: './workshop-category-list.component.html',
  styleUrls: ['./workshop-category-list.component.scss']
})
export class WorkshopCategoryListComponent implements OnInit, OnDestroy {

  destory: Subject<boolean> = new Subject();

  categories!: Observable<Category[]>;

  constructor(navigationService: NavigationService) {
    this.categories = navigationService.categories$;
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.destory.next(true);
  }

}
