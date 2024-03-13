import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from './course.service';
import { AllCoursesComponent } from './all-courses/all-courses.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { ShowSmallCourseComponent } from './show-small-course/show-small-course.component';
import { HttpClientModule } from '@angular/common/http';
import { CourseRoutingModule } from './course-routing.module';
import { AuthService } from '../services/auth.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    AllCoursesComponent,
    AddCourseComponent,
    CourseDetailsComponent,
    ShowSmallCourseComponent,
    CourseRoutingModule
  ],
  providers: [
    CourseService, AuthService
  ]
})
export class CourseModule { }
