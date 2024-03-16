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
import { Observable, Subscription } from 'rxjs';
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
  courseToEditOb!: Observable<Course | null>;
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
    //set courseToEdit
    this.courseToEditOb.subscribe(val => {
      if (val)
        this.courseToEdit = val;
      else
        this.courseToEdit = undefined;
      this.courseForm = new FormGroup({
        "id": new FormControl(this.courseToEdit ? this.courseToEdit.id : 0),
        "name": new FormControl(this.courseToEdit?.name, Validators.required),
        "categoryId": new FormControl(this.courseToEdit?.categoryId, Validators.required),
        "lessonsAmount": new FormControl(this.courseToEdit?.lessonsAmount, [Validators.required, Validators.min(1)]),
        "startLearning": new FormControl(this.courseToEdit?.startLearning, [Validators.required]),
        "syllabus": new FormArray((this.courseToEdit?.getSyllabus() ?? [])
          .map(syllabusItem => new FormControl(syllabusItem))),
        "learningType": new FormControl(this.courseToEdit?.learningType, [Validators.required]),
        "lecturerId": new FormControl(this.lecture?.id),
        "imgLink": new FormControl()
      });
    })
    //get categories
    this._categoryService.getCategoryList().subscribe({
      next: (res) => {
        this.categories = res;
      },
      error: (err) => {
        console.log("error in getting the list of categories", err.error);
      }
    })
    //set course to edit by URL
    this._route.paramMap.subscribe(params => {
      let courseId = Number(params.get('id'))
      if (courseId) {
        this._courseService.getCourseById(courseId).subscribe({
          next: (res) => {
            this.courseToEditOb = new Observable((ob) => {
              ob.next(res);
            })
          }
        })
      } else {
        this.courseToEditOb = new Observable((ob) => {
          ob.next(null)
        })
      }

    });
  }

}
