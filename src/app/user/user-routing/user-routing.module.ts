import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { NotFoundComponent } from '../../pages/not-found/not-found.component';
import { RegisterComponent } from '../register/register.component';

const userRoutes: Routes = [
  // { path: '', redirectTo: "home", pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: "update/:id", component: UserDetailsComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(userRoutes)
  ],
  exports: [RouterModule]
})
export class UserRoutingModule{

  
}
