import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkshopEditorRoutingModule } from './workshop-editor-routing.module';
import { WorkshopEditorComponent } from './workshop-editor.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteCategoryModalComponent } from './category-list/delete-category-modal/delete-category-modal.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    WorkshopEditorComponent,
    CategoryListComponent,
    DeleteCategoryModalComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    WorkshopEditorRoutingModule
  ]
})
export class WorkshopEditorModule { }
