import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkshopSidenavComponent } from './workshop-sidenav.component';

const routes: Routes = [
  {
    path: '',
    component: WorkshopSidenavComponent,
    children: [
    {
      path: 'dashboard',
      loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkshopSidenavRoutingModule { }
