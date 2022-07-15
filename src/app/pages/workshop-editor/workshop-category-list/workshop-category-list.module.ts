import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkshopCategoryListRoutingModule } from './workshop-category-list-routing.module';
import { WorkshopCategoryListComponent } from './workshop-category-list.component';


@NgModule({
  declarations: [
    WorkshopCategoryListComponent
  ],
  imports: [
    CommonModule,
    WorkshopCategoryListRoutingModule
  ]
})
export class WorkshopCategoryListModule { }
