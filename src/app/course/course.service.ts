import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../Entities/Course.model';
import { User } from '../Entities/User.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private _http: HttpClient) { }

  getListOfCourses(): Observable<Course[]> {
    return this._http.get<Course[]>('http://localhost:5014/api/course');
  }
  addCourse(courseToAdd: Course): Observable<Course> {
    return this._http.post<Course>('http://localhost:5014/api/course', courseToAdd);
  }
  deleteCourse(id: number) {
    return this._http.delete(`http://localhost:5014/api/course/${id}`);
  }
  updateCourse(id: number, courseToUpdate: Course): Observable<Course> {
    return this._http.post<Course>(`http://localhost:5014/api/course/${id}`, courseToUpdate);
  }
  registerToCourse(courseId: number, userId: number) {
    return this._http.post(`http://localhost:5014/api/course/${courseId}`, null, { params: { userId: userId } });
  }
  getCoursesByUser(userId: number): Observable<Course[]> {
    return this._http.get<Course[]>(`http://localhost:5014/api/course/user/${userId}`);
  }
  getCourseById(courseId: number): Observable<Course> {
    return this._http.get<Course>(`http://localhost:5014/api/course/${courseId}`);
  }
  getLecture(lectureId: number): Observable<User> {
    return this._http.get<User>(`http://localhost:5014/api/user/${lectureId}`);
  }

}
