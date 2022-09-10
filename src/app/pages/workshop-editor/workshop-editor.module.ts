import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkshopEditorRoutingModule } from './workshop-editor-routing.module';
import { WorkshopEditorComponent } from './workshop-editor.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DeleteCategoryModalComponent } from './category-list/delete-category-modal/delete-category-modal.component';
import { MatButtonModule } from '@angular/material/button';
import { EditCategoryModalComponent } from './category-list/edit-category-modal/edit-category-modal.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateCategoryModalComponent } from './category-list/create-category-modal/create-category-modal.component';
import { PageListComponent } from './page-list/page-list.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CreatePageModalComponent } from './page-list/create-page-modal/create-page-modal.component';
import { DeletePageModalComponent } from './page-list/delete-page-modal/delete-page-modal.component';
import { EditPageModalComponent } from './page-list/edit-page-modal/edit-page-modal.component';

import { NgxEditorjsModule } from 'ngx-editorjs';


@NgModule({
  declarations: [
    WorkshopEditorComponent,
    CategoryListComponent,
    DeleteCategoryModalComponent,
    EditCategoryModalComponent,
    CreateCategoryModalComponent,
    PageListComponent,
    CreatePageModalComponent,
    DeletePageModalComponent,
    EditPageModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DragDropModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    WorkshopEditorRoutingModule,
    NgxEditorjsModule
  ]
})
export class WorkshopEditorModule { }
