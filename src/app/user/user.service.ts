import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../Entities/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  loginUser(username: string, password: string): Observable<User> {
    return this._http.post<User>("http://localhost:5014/api/login", null, {
      params: { username, password }
    });
  }
  signIn(user: User): Observable<User> {
    return this._http.post<User>("http://localhost:5014/api/register", user);
  }
  updateUser(user: User): Observable<User> {
    return this._http.put<User>(`http://localhost:5014/api/user/${user.id}`, user);
  }
  getUserById(id: number): Observable<User> {
    return this._http.get<User>(`http://localhost:5014/api/user/${id}`);
  }

}
