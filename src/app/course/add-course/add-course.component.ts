import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Course, LearningType } from '../../Entities/Course.model';
import { Role, User } from '../../Entities/User.model';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Category } from '../../Entities/Caregory.model';
import { CategoryService } from '../../category/category.service';

@Component({
  selector: 'add-course',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.scss'
})
export class AddCourseComponent implements OnInit {

  courseForm!: FormGroup;
  courseToEdit?: Course;
  courseToEditOb: BehaviorSubject<Course | null> = new BehaviorSubject<Course | null>(null);
  lecture?: User;
  learningTypes = LearningType;
  subscription: Subscription = new Subscription;
  categories: Category[] = [];

  constructor(
    private _authService: AuthService,
    private _courseService: CourseService,
    private _route: ActivatedRoute,
    private router: Router,
    private _categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    //check if login and lecture
    this._authService.getUser().subscribe(u => {
      if (!u || u.role != Role.lecturer) {
        Swal.fire({
          icon: 'error',
          title: 'אינך מורשה',
          showConfirmButton: false,
          timer: 2000
        });
        this.router.navigate(['home']);
      }
    })
    //get categories
    this._categoryService.getCategoryList().subscribe({
      next: (res) => {
        this.categories = res;
      },
      error: (err) => {
        console.log("error in getting the list of categories", err.error);
      }
    });

    //set course to edit by URL
    this._route.paramMap.subscribe(params => {
      let courseId = Number(params.get('id'))
      if (courseId) {
        this._courseService.getCourseById(courseId).subscribe({
          next: (res) => {
            this.courseToEditOb.next(res);
          }
        })
      } else {
        this.courseToEditOb.next(null);
      }
    });

    this.courseToEditOb.subscribe(val => {
      this.courseToEdit = val || undefined;
      this.courseForm.patchValue({
        "id": this.courseToEdit ? this.courseToEdit.id : 0,
        "name": this.courseToEdit?.name,
        "categoryId": this.courseToEdit?.categoryId,
        "lessonsAmount": this.courseToEdit?.lessonsAmount || 0,
        "startLearning": this.courseToEdit?.startLearning,
        "syllabus": new FormArray((this.courseToEdit?.getSyllabus() || [])
          .map(syllabusItem => new FormControl(syllabusItem))),
        "learningType": this.courseToEdit?.learningType,
        "lecturerId": this.lecture?.id,
        "imgLink": this.courseToEdit?.imgLink
      });
    });
  }
}
