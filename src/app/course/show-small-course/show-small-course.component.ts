import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Course } from '../../Entities/Course.model';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {} from '@angular/material';
import { Category } from '../../Entities/Caregory.model';

@Component({
  selector: 'show-small-course',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './show-small-course.component.html',
  styleUrl: './show-small-course.component.scss'
})
export class ShowSmallCourseComponent {

  @Input()
  public course!:Course;

  getLectureName(): string {
    return "lecture"
  }
  category(): Category {
    return new Category();
  }
}
