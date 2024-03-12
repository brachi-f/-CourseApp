import { CourseDetailsComponent } from './course-details/course-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllCoursesComponent } from './all-courses/all-courses.component';
import { NotFoundComponent } from '../pages/not-found/not-found.component';
import { AddCourseComponent } from './add-course/add-course.component';

const courseRoutes: Routes = [
  { path: 'all', component: AllCoursesComponent, pathMatch: 'full' },/*all */
  { path: 'all/:id', component: AllCoursesComponent },/*mine */
  { path: ':id', component: CourseDetailsComponent },
  { path: 'edit', component: AddCourseComponent, pathMatch: 'full' },/*new */
  { path: 'edit/:id', component: AddCourseComponent, pathMatch: 'full' },/*edit */
  { path: '**', component: NotFoundComponent }
] ;

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(courseRoutes)
  ],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
