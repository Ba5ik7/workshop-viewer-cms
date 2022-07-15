import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkshopEditorComponent } from './workshop-editor.component';

const routes: Routes = [
  {
    path: ':section',
    component: WorkshopEditorComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'workshop-category-list'
      },
      {
        path: 'workshop-category-list',
        loadChildren: () => import('./workshop-category-list/workshop-category-list.module').then(m => m.WorkshopCategoryListModule)
      },
      {
        path: ':categoryId',
        loadChildren: () => import('./workshop-detail/workshop-detail.module').then(m => m.WorkshopDetailModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkshopEditorRoutingModule { }
