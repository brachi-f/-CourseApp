import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../Entities/User.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userLogged = new BehaviorSubject<User | null>(null);

  setUser(value: User | null): void {
    this.userLogged.next(value);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem("user", JSON.stringify(value));
    }
  }

  getUser(): BehaviorSubject<User | null> {
    if (typeof window !== 'undefined') {
      const userData = sessionStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        this.userLogged.next(user);
      }
    }
    return this.userLogged;
  }
}