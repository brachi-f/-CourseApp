import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'login',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public loginForm!: FormGroup;
  ngOnInit() {
    this.loginForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    })
  }
  login() {
    this._userService.loginUser(this.loginForm.value['name'], this.loginForm.value['password']).subscribe({
      next: (res) => {
        localStorage.setItem("user", JSON.stringify(res));
        Swal.fire({
          icon: 'success',
          title: `ברוך הבא ${res.name}`,
          showConfirmButton: false,
          timer: 1500
        });
        this._router.navigate(['home']);
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: err.message,
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }
  constructor(private _userService: UserService, private _router: Router) { }
}
