import { UserDetailsComponent } from './user-details/user-details.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing/user-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule,
    UserRoutingModule, LoginComponent, UserDetailsComponent, RegisterComponent
  ],
  providers: [UserService],
  exports: []
})
export class UserModule {
  ngOnInit(): void {
    alert("user module");
  }
}
