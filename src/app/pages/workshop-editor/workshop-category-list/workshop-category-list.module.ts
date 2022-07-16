import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkshopCategoryListRoutingModule } from './workshop-category-list-routing.module';
import { WorkshopCategoryListComponent } from './workshop-category-list.component';
import { MatCardModule } from '@angular/material/card'

@NgModule({
  declarations: [
    WorkshopCategoryListComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    WorkshopCategoryListRoutingModule
  ]
})
export class WorkshopCategoryListModule { }
