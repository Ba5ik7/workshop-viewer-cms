import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkshopEditorRoutingModule } from './workshop-editor-routing.module';
import { WorkshopEditorComponent } from './workshop-editor.component';
import { CategoryListComponent } from './category-list/category-list.component';


@NgModule({
  declarations: [
    WorkshopEditorComponent,
    CategoryListComponent
  ],
  imports: [
    CommonModule,
    WorkshopEditorRoutingModule
  ]
})
export class WorkshopEditorModule { }
