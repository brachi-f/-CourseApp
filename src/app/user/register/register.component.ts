import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import Swal from 'sweetalert2';
import { Role, User } from '../../Entities/User.model';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'register',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  public signinUser!: FormGroup;

  ngOnInit(): void {
    this.signinUser = new FormGroup({
      name: new FormControl("", [Validators.required]),
      address: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
      role: new FormControl("", [Validators.required])
    });
  }

  register() {
    let user: User;
    if (this.signinUser.valid) {
      user = this.signinUser.value;
      user.role = user.role == Role.student ? 0 : 1;
      this._userService.signIn(user).subscribe({
        next: (res) => {
          Swal.fire({
            showConfirmButton: false,
            title: `שלום ${res.name}`,
            text: 'שמחים שהצטרפת אלינו!',
            timer: 2000,
            icon: 'success'
          });
          this._authService.setUser(res);
          this._router.navigate(['home']);
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            showConfirmButton: false,
            timer: 2000,
            text: err.error
          });
        }
      });
    }
  }
  constructor(private _userService: UserService, private _router: Router, private _authService: AuthService) { }

}