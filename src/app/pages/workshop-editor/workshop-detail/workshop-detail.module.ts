import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkshopDetailComponent } from './workshop-detail.component';
import { WorkshopViewerModule } from 'src/app/shared/components/workshop-viewer/workshop-viewer.module';
import { RouterModule } from '@angular/router';
import { WorkshopDetailRoutingModule } from './workshop-detail-routing.module';
import { MatDividerModule } from '@angular/material/divider';



@NgModule({
  declarations: [WorkshopDetailComponent],
  exports: [WorkshopDetailComponent],
  imports: [
    CommonModule,
    RouterModule,
    WorkshopDetailRoutingModule,
    WorkshopViewerModule,
    MatDividerModule
  ]
})
export class WorkshopDetailModule { }
