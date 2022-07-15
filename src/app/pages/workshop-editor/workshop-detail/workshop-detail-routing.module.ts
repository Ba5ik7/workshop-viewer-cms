import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailOverviewComponent } from './detail-overview/detail-overview.component';
import { WorkshopDetailComponent } from './workshop-detail.component';

const routes: Routes = [
  { 
    path: '',
    component: DetailOverviewComponent
  },
  { 
    path: ':workshopId',
    component: WorkshopDetailComponent
  },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkshopDetailRoutingModule { }
