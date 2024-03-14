import { Component, Input, OnInit } from '@angular/core';
import { CourseDetailsComponent } from '../course-details/course-details.component';
import { Course } from '../../Entities/Course.model';
import { CourseService } from '../course.service';

@Component({
  selector: 'all-courses',
  standalone: true,
  imports: [
    CourseDetailsComponent,
  ],
  templateUrl: './all-courses.component.html',
  styleUrl: './all-courses.component.scss'
})
export class AllCoursesComponent implements OnInit{
  
  public courseList?:Course[];

  userId?:number;

  ngOnInit(): void {
    if(!this.userId)
    this._courseService.getListOfCourses().subscribe({
      next: (res)=>{
        this.courseList = res;
        console.log("res",res)
      },
      error: (err)=>{
        console.error(err.error);
      }
    })
    else
    this._courseService.getCoursesByUser(this.userId).subscribe({
      next: (res)=>{
        this.courseList = res;
        console.log("res",res)
      },
      error: (err)=>{
        console.error(err.error);
      }
  })
  }

  constructor(private _courseService : CourseService){}

}
