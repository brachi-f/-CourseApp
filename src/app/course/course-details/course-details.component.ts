import { Category } from './../../Entities/Caregory.model';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Course } from '../../Entities/Course.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { } from '@angular/material';
import { User } from '../../Entities/User.model';

@Component({
  selector: 'course-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss'
})
export class CourseDetailsComponent {

  @Input()
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
