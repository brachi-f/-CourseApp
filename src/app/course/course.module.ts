import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from './course.service';
import { AllCoursesComponent } from './all-courses/all-courses.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { ShowSmallCourseComponent } from './show-small-course/show-small-course.component';
import { HttpClientModule } from '@angular/common/http';
import { CourseRoutingModule } from './course-routing.module';
import { AuthService } from '../services/auth.service';
import { CategoryModule } from '../category/category.module';
import { LearningIconPipe } from './learning-icon.pipe';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    CourseRoutingModule,
    AddCourseComponent,
    AllCoursesComponent,
    // EditCourseComponent,
    CategoryModule,
    ShowSmallCourseComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    CourseService, AuthService, LearningIconPipe
  ]
})
export class CourseModule { }
