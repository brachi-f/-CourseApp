import { Category } from './../../Entities/Caregory.model';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../../Entities/Course.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { } from '@angular/material';
import { User } from '../../Entities/User.model';
import { CourseService } from '../course.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { DisplayCategoryComponent } from '../../category/display-category/display-category.component';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}


@Component({
  selector: 'course-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatListModule,
    MatDividerModule,
    DisplayCategoryComponent
  ],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss'
})
export class CourseDetailsComponent implements OnInit {

  ngOnInit(): void {
    this._courseService.getCourseById(this.courseId).subscribe({
      next: (res) => {
        this.currentCourse = res;
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: err.error,
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
    this._authService.getUser().subscribe(user => {
      this.user = user ? user : undefined;
      if (!user)
        this._route.navigate(['home']);
    });
    this._courseService.getLecture(this.currentCourse?.lecturerId || 0).subscribe({
      next:(res)=>{
        this.lectureName = res.name;
      },
      error:(err)=>{
        console.error("error in getting lecture name",err)
      }
    })
  }

  constructor(private _courseService: CourseService, private _authService: AuthService, private _route: Router) { }

  @Input()
  public courseId!: number;
  public currentCourse!: Course;
  public user?: User;
  public lectureName?:string;
  
  syllabus(): string[] | undefined {
    let s = this.currentCourse.syllabus?.split('|');
    return s;
  }
  category(): Category {
    return new Category();
  }
}
