import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../../Entities/User.model';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu'

@Component({
  selector: 'header',
  standalone: true,
  imports: [
    CommonModule, MatToolbarModule, MatButtonModule,
    MatIconModule, RouterLink, RouterLinkActive, MatMenuModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  public user?: User;

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem("user");
      if (userData) {
        this.user = JSON.parse(userData);
      }
    }
  }
  logOut(): void {
    localStorage.removeItem("user");
    this.user = undefined;
    this._route.navigate(['home']);
  }
  constructor(private _route: Router) { }
}
