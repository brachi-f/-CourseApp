import { Component, OnInit } from '@angular/core';
import { CourseDetailsComponent } from '../course-details/course-details.component';
import { Course } from '../../Entities/Course.model';
import { CourseService } from '../course.service';

@Component({
  selector: 'all-courses',
  standalone: true,
  imports: [
    CourseDetailsComponent
  ],
  templateUrl: './all-courses.component.html',
  styleUrl: './all-courses.component.scss'
})
export class AllCoursesComponent implements OnInit{
  
  public courseList?:Course[];

  ngOnInit(): void {
    this._courseService.getListOfCourses().subscribe({
      next: (res)=>{
        this.courseList = res;
      },
      error: (err)=>{
        console.error(err.error);
      }
    })
  }

  constructor(private _courseService : CourseService){}


}
