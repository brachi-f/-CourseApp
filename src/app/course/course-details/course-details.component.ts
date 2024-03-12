import { Category } from './../../Entities/Caregory.model';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../../Entities/Course.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { } from '@angular/material';
import { User } from '../../Entities/User.model';
import { CourseService } from '../course.service';
import Swal from 'sweetalert2';

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
    MatGridListModule
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
    })
  }

  constructor(private _courseService: CourseService) { }

  @Input()
  public courseId!: number;
  public currentCourse!: Course;
  public user!: User;
  getLectureName(): string {
    return "lecture"
  }
  syllabus(): string {
    return this.currentCourse.syllabus?.toString() || "syllabus";
  }
  category(): Category {
    return new Category();
  }
}
