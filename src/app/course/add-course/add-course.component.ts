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
import { MatChipsModule } from '@angular/material/chips';
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
    FormsModule,
    MatChipsModule
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
  syllabusArr: string[] = [];
  syllabusControls: FormControl[] = [new FormControl()]

  constructor(
    private _authService: AuthService,
    private _courseService: CourseService,
    private _route: ActivatedRoute,
    private router: Router,
    private _categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    // Initialize courseForm FormGroup
    this.courseForm = new FormGroup({
      "id": new FormControl(0),
      "name": new FormControl('', Validators.required),
      "categoryId": new FormControl('', Validators.required),
      "lessonsAmount": new FormControl(0, [Validators.required, Validators.min(1)]),
      "startLearning": new FormControl('', Validators.required),
      "syllabus": new FormArray([]),
      "learningType": new FormControl(null, Validators.required),
      "lecturerId": new FormControl(''),
      "imgLink": new FormControl('', Validators.required)
    });

    // check login and lecture
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
    });

    // Fetch categories
    this._categoryService.getCategoryList().subscribe({
      next: (res) => {
        this.categories = res;
      },
      error: (err) => {
        console.log("error in getting the list of categories", err.error);
      }
    });

    // Set course to edit by URL
    this._route.paramMap.subscribe(params => {
      let courseId = Number(params.get('id'));
      if (courseId) {
        this._courseService.getCourseById(courseId).subscribe({
          next: (res) => {
            console.log("syllabus: ", this._courseService.getSyllabus(res))
            this.courseToEditOb.next(res);
          }, error: (err) => {
            console.log("err by getting course by id", err.error)
          }
        });
      } else {
        console.log("no id in URL")
        this.courseToEditOb.next(null);
      }
    });

    // Subscribe to courseToEditOb
    this.courseToEditOb.subscribe(val => {
      console.log("this.courseToEditOb.subscribe", val)
      this.courseToEdit = val || undefined;
      if (val) {
        this.syllabusArr = this._courseService.getSyllabus(val);
        this.syllabusControls = this.syllabusArr.map(syllabusItem => new FormControl(syllabusItem));
        this.syllabusControls.push(new FormControl())
        this.courseForm.patchValue({
          "id": this.courseToEdit ? this.courseToEdit.id : 0,
          "name": this.courseToEdit?.name,
          "categoryId": this.courseToEdit?.categoryId,
          "lessonsAmount": this.courseToEdit?.lessonsAmount || 0,
          "startLearning": this.courseToEdit?.startLearning,
          "syllabus": new FormArray(this.syllabusControls),
          "learningType": this.courseToEdit?.learningType === LearningType.zoom ? 0 : 1,
          "lecturerId": this.lecture?.id,
          "imgLink": this.courseToEdit?.imgLink
        });
      }
      else {
        this.courseForm.reset()
        // this.syllabusControls.push(new FormControl())
      }
    });
  }

  updateCategoryId(event: any) {
    let catId = event.target.value;
    this.courseForm.patchValue({
      "categoryId": catId
    });
  }
  changeSyllabus() {
    this.syllabusControls = this.syllabusControls.filter(s => s.value)
    this.syllabusControls.push(new FormControl())
  }
}
