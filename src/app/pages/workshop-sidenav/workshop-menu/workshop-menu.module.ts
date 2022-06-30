import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkshopMenuComponent } from './workshop-menu.component';
import { RouterModule } from '@angular/router';

import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DeleteSectionModalComponent } from './delete-section-modal/delete-section-modal.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [WorkshopMenuComponent, DeleteSectionModalComponent],
  exports: [WorkshopMenuComponent, DeleteSectionModalComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatDialogModule
  ]
})
export class WorkshopMenuModule { }
