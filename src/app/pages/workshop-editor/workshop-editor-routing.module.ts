import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkshopEditorComponent } from './workshop-editor.component';
import { WorkshopComponent } from './workshop/workshop.component';

const routes: Routes = [
  {
    path: ':section',
    component: WorkshopEditorComponent,
    children: [
      {
        path: ':categoryId',
        component: WorkshopComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkshopEditorRoutingModule { }
