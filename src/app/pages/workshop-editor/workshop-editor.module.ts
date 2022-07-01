import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkshopEditorRoutingModule } from './workshop-editor-routing.module';
import { WorkshopEditorComponent } from './workshop-editor.component';


@NgModule({
  declarations: [
    WorkshopEditorComponent
  ],
  imports: [
    CommonModule,
    WorkshopEditorRoutingModule
  ]
})
export class WorkshopEditorModule { }
