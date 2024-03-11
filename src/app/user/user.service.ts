import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Entities/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  loginUser(name: string, password: string): Observable<User> {
    return this._http.post<User>("/api/login", { name: name, password: password });
  }
  signIn(user: User): Observable<User> {
    return this._http.post<User>("/api/register", user);
  }
  updateUser(user: User): Observable<User> {
    return this._http.put<User>(`/api/user/${user.id}`, user);
  }
  getUserById(id:number): Observable<User>{
    return this._http.get<User>(`/api/user/${id}`);
  }

}
