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
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
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
    MatChipsModule,
    MatButtonModule,
    MatSidenavModule
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
  categoryForm: FormGroup = new FormGroup({
    "id": new FormControl(0),
    "name": new FormControl('', Validators.required),
    "iconRouting": new FormControl('', Validators.required)
  })
  constructor(
    private _authService: AuthService,
    private _courseService: CourseService,
    private _route: ActivatedRoute,
    private router: Router,
    private _categoryService: CategoryService
  ) { }

  ngOnInit(): void {

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
      else
        this.lecture = u;
    });
    // Initialize courseForm FormGroup
    this.courseForm = new FormGroup({
      "id": new FormControl(0),
      "name": new FormControl('', Validators.required),
      "categoryId": new FormControl('', Validators.required),
      "lessonsAmount": new FormControl(0, [Validators.required, Validators.min(1)]),
      "startLearning": new FormControl('', Validators.required),
      "syllabus": new FormArray([]),
      "learningType": new FormControl(null, Validators.required),
      "lecturerId": new FormControl(this.lecture?.id),
      "imgLink": new FormControl('', Validators.required)
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
            this.courseToEditOb.next(res);
          }, error: (err) => {
            console.log("err by getting course by id", err.error)
          }
        });
      } else {
        this.courseToEditOb.next(null);
      }
    });

    // Subscribe to courseToEditOb
    this.courseToEditOb.subscribe(val => {
      this.courseToEdit = val || undefined;
      if (val) {
        console.log("val", val);
        this.syllabusArr = this._courseService.getSyllabus(val);
        console.log("syllabusArr:", this.syllabusArr);

        // Clear the existing syllabus form controls
        (this.courseForm.get('syllabus') as FormArray).clear();

        if (Array.isArray(this.syllabusArr)) {
          this.syllabusControls = this.syllabusArr.map(syllabusItem => new FormControl(syllabusItem));
          this.syllabusControls.push(new FormControl());

          this.syllabusControls.forEach(control => {
            (this.courseForm.get('syllabus') as FormArray).push(control);
          });
          console.log("lecture", this.lecture)
          this.courseForm.patchValue({
            "id": this.courseToEdit ? this.courseToEdit.id : 0,
            "name": this.courseToEdit?.name,
            "categoryId": this.courseToEdit?.categoryId,
            "lessonsAmount": this.courseToEdit?.lessonsAmount || 0,
            "startLearning": this.courseToEdit?.startLearning,
            "learningType": this.courseToEdit?.learningType,
            "imgLink": this.courseToEdit?.imgLink,
            "lecturerId": this.lecture?.id
          });
          console.log("Update formGroup:");
        } else {
          console.error("SyllabusArr is not an array");
        }
      } else {
        this.courseForm.reset();
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
  save() {
    if (this.courseForm.errors) {
      console.log(this.courseForm.errors)
      return;
    }
    console.log(this.courseForm.value)
    let courseToAdd: Course = this.courseForm.value;
    const syllabusFormArray = this.courseForm.get('syllabus') as FormArray;
    syllabusFormArray.clear(); // Clear the existing values

    // Populate the FormArray with the new values entered in the input fields
    for (let control of this.syllabusControls) {
      if (control.value) {
        syllabusFormArray.push(new FormControl(control.value));
      }
    }
    // Convert the syllabus FormArray to a pipe-separated string
    let syllabusString = syllabusFormArray.value.join('|');
    // console.log(syllabusString);
    courseToAdd.syllabus = syllabusString;
    console.log("course to add", courseToAdd, "lecture", this.lecture, "course to edit", this.courseToEdit)
    if (this.lecture)
      courseToAdd.lecturerId = this.lecture.id
    //save to server
    if (!this.courseToEdit) {
      courseToAdd.id = 0;
      this._courseService.addCourse(courseToAdd).subscribe({
        next: (res) => {
          console.log("add course:", res);
          Swal.fire({
            icon: 'success',
            showConfirmButton: false,
            title: 'הקורס נוסף בהצלחה',
            timer: 2000
          })
          this.router.navigate(['course/all']);
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: err.error,
            showConfirmButton: false,
            timer: 2000
          })
        }
      })
    } else {
      courseToAdd.id = this.courseToEdit.id
      this._courseService.updateCourse(courseToAdd.id, courseToAdd).subscribe({
        next: (res) => {
          console.log("updated course:", res);
          Swal.fire({
            icon: 'success',
            showConfirmButton: false,
            title: 'הקורס עודכן בהצלחה',
            timer: 2000
          })
          this.router.navigate(['course/all']);
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: err.error,
            showConfirmButton: false,
            timer: 2000
          })
        }
      })
    }
  }

  saveCat() {
    let category = this.categoryForm.value;
    this._categoryService.addCategory(category).subscribe({
      next: (res) => {
        this.categories = res
        Swal.fire({
          icon: 'success',
          title: 'נוספה בהצלחה',
          timer: 2000,
          showConfirmButton: false,
          position:'bottom-left',
        })
      },
      error: (err)=>{
        Swal.fire({
          icon: 'error',
          title: err.error,
          timer: 2000,
          showConfirmButton: false,
          position: 'bottom-left'
        })
        
      }
    })
  }
}
