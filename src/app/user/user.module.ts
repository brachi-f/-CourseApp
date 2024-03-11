import { UserDetailsComponent } from './user-details/user-details.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserRoutingModule } from './user-routing/user-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule, UserRoutingModule
  ],
  providers: [UserService],
  exports: []
})
export class UserModule { }
