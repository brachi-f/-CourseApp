import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../../Entities/User.model';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu'
import { AuthService } from '../../services/auth.service';

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
    this._authService.getUser().subscribe(user => {
      this.user = user? user : undefined;
    });
  }
  logOut(): void {
    this._authService.setUser(null);
    this._route.navigate(['home']);
  }
  navToAdd():void{
    this._route.navigate(['/course/edit']);
  }
  constructor(private _route: Router, private _authService: AuthService) { }
}
