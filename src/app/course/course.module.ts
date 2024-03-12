import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from './course.service';
import { AllCoursesComponent } from './all-courses/all-courses.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { ShowSmallCourseComponent } from './show-small-course/show-small-course.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AllCoursesComponent,
    AddCourseComponent,
    CourseDetailsComponent,
    ShowSmallCourseComponent
  ],
  providers: [
    CourseService
  ]
})
export class CourseModule { }
