import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Course, LearningType } from '../../Entities/Course.model';
import { Role, User } from '../../Entities/User.model';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';

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
  lecture?: User;
  learningTypes = LearningType;
  subscription: Subscription = new Subscription;

  constructor(
    private _authService: AuthService,
    private _courseService: CourseService,
    private _route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.courseForm = new FormGroup({
      "id": new FormControl(this.courseToEdit ? this.courseToEdit.id : 0),
      "name": new FormControl(this.courseToEdit?.name, Validators.required),
      "categoryId": new FormControl(this.courseToEdit?.categoryId, Validators.required),
      "lessonsAmount": new FormControl(this.courseToEdit?.lessonsAmount, [Validators.required, Validators.min(1)]),
      "startLearning": new FormControl(this.courseToEdit?.startLearning, [Validators.required]),
      "syllabus": new FormControl(this.courseToEdit?.syllabus),
      "learningType": new FormControl(this.courseToEdit?.learningType, [Validators.required]),
      "lecturerId": new FormControl(this.lecture?.id),
      "imgLink": new FormControl()
    });
    this._route.paramMap.subscribe(params => {
      let courseId = Number(params.get('id'))
      if (courseId) {
        this._courseService.getCourseById(courseId).subscribe(newCourse => {
          if (newCourse) {
            this.courseToEdit = newCourse;
            this.courseForm.patchValue({
              "id": this.courseToEdit?.id,
              "name": this.courseToEdit?.name,
              "categoryId": this.courseToEdit?.categoryId,
              "lessonsAmount": this.courseToEdit?.lessonsAmount,
              "startLearning": this.courseToEdit?.startLearning,
              "syllabus": this.courseToEdit?.syllabus,
              "learningType": this.courseToEdit?.learningType,
            });
          } else {
            this.courseToEdit = undefined;
            this.courseForm.reset();
          }
        });
      }
    })

  }

}
