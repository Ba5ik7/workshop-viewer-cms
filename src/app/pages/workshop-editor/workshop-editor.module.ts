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
import { EditCategoryModalComponent } from './category-list/edit-category-modal/edit-category-modal.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateCategoryModalComponent } from './category-list/create-category-modal copy/create-category-modal.component';


@NgModule({
  declarations: [
    WorkshopEditorComponent,
    CategoryListComponent,
    DeleteCategoryModalComponent,
    EditCategoryModalComponent,
    CreateCategoryModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    WorkshopEditorRoutingModule
  ]
})
export class WorkshopEditorModule { }
