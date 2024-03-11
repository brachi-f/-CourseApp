import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../../Entities/User.model';
import { Router } from '@angular/router';


@Component({
  selector: 'header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  public user?: User;

  ngOnInit(): void {
    const userData = localStorage.getItem("user");
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }
  clickUser(): void {
    if (!this.user)
      this._route.navigate(['/login']);
    else
      this._route.navigate(['/user']);

  }
  constructor(private _route: Router) { }
}
