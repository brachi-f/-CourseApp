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
import { LearningIconPipe } from '../learning-icon.pipe';
import { LearningType } from '../../Entities/Course.model';

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
    DisplayCategoryComponent,
    LearningIconPipe
  ],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss'
})
export class CourseDetailsComponent implements OnInit {

  LearningType = LearningType;

  ngOnInit(): void {
    if (this.courseId)
      this._courseService.getCourseById(this.courseId).subscribe({
        next: (res) => {
          this.currentCourse = res;
          if (this.currentCourse)
            this._courseService.getLecture(this.currentCourse.lecturerId).subscribe({
              next: (res) => {
                this.lectureName = res.name;
              },
              error: (err) => {
                console.log("error in getting lecture name", err)
              }
            })
        },
        error: (err) => {
          console.log("error in get course by id", err)
          Swal.fire({
            icon: 'error',
            title: err.error,
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
    this._authService.getUser().subscribe(user => {
      if (user)
        this.user = user;
      if (!user)
        this._route.navigate(['home']);
    });

  }

  constructor(private _courseService: CourseService, private _authService: AuthService, private _route: Router) { }

  @Input()
  public courseId!: number;
  public currentCourse!: Course;
  public user!: User;
  public lectureName?: string;

  syllabus(): string[] | undefined {
    let s = this.currentCourse.syllabus?.split('|');
    return s;
  }
  register() {
    Swal.fire({
      title: 'האם אתה רוצה להירשם?',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: false,
      confirmButtonColor: 'green',
      confirmButtonText: 'כן, תירשמו אותי לקורס',
      showCloseButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.registerToCourse(); // Call registerToCourse if the user confirms
      }
    });
  }

  registerToCourse() {
    console.log("registerToCourse")
    this._courseService.registerToCourse(this.currentCourse.id, this.user.id).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          timer: 2000,
          title: 'נרשמת בהצלחה',
          titleText: 'שמחים שהצטרפת אלינו😊',
          showConfirmButton: false
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: err.error,
          showConfirmButton: false,
          timer: 2000
        });
      }
    });
  }
  deleteCourse() {
    Swal.fire({
      icon: 'warning',
      title: 'האם אתה בטוח שברצונך למחוק את הקורס?',
      showConfirmButton: true,
      confirmButtonText: 'כן',
      showCloseButton: true
    }).then((res) => {
      if (res.isConfirmed)
        this._courseService.deleteCourse(this.courseId).subscribe({
          next: (res) => {
            Swal.fire({
              icon: 'success',
              title: 'הקורס נמחק בהצלחה!',
              showConfirmButton: false,
              timer: 1500
            })
          }
        })
      this._route.navigate(['home'])
    })
  }
  editCourse() {
    this._route.navigate([`course/edit/${this.courseId}`])
  }
  inWeek(): boolean {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000); // Get the date for next week

    if (this.currentCourse && this.currentCourse.startLearning) {
      const courseStartDate = new Date(this.currentCourse.startLearning);
      return courseStartDate > today && courseStartDate <= nextWeek;
    }

    return false;
  }
}