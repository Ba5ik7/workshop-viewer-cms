import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ChatComponent } from './chat.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'General'
  },
  {
    canActivate: [AuthGuard],
    path: ':categoryId',
    component: ChatComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
