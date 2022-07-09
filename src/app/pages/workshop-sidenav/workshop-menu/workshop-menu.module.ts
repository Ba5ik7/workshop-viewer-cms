import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkshopMenuComponent } from './workshop-menu.component';
import { RouterModule } from '@angular/router';

import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { CreateSectionModalComponent } from './create-section-modal/create-section-modal.component';
import { DeleteSectionModalComponent } from './delete-section-modal/delete-section-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';



@NgModule({
  declarations: [WorkshopMenuComponent, DeleteSectionModalComponent, CreateSectionModalComponent],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }
  ],
  exports: [WorkshopMenuComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule
  ]
})
export class WorkshopMenuModule { }
