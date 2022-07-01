import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkshopEditorComponent } from './workshop-editor.component';

const routes: Routes = [
  {
    path: ':categoryId',
    component: WorkshopEditorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkshopEditorRoutingModule { }
