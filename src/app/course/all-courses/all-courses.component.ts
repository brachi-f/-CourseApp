import { Component } from '@angular/core';
import { CourseDetailsComponent } from '../course-details/course-details.component';

@Component({
  selector: 'all-courses',
  standalone: true,
  imports: [
    CourseDetailsComponent
  ],
  templateUrl: './all-courses.component.html',
  styleUrl: './all-courses.component.scss'
})
export class AllCoursesComponent {

}
