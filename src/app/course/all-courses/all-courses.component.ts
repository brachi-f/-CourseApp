import { Component, Input, OnInit } from '@angular/core';
import { CourseDetailsComponent } from '../course-details/course-details.component';
import { Course } from '../../Entities/Course.model';
import { CourseService } from '../course.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'all-courses',
  standalone: true,
  imports: [
    CourseDetailsComponent,
  ],
  templateUrl: './all-courses.component.html',
  styleUrl: './all-courses.component.scss'
})
export class AllCoursesComponent implements OnInit {

  public courseList?: Course[];

  userId?: number;

  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
      this.userId = Number(params.get('id'));
      if(this.userId){
        this._courseService.getCoursesByUser(this.userId).subscribe({
          next:(res)=>{
            this.courseList = res;
          },
          error:(err)=>{
            console.error("error in getting user's courses",err)
          }
        })
      }else{
        this._courseService.getListOfCourses().subscribe({
          next:(res)=>{
            this.courseList = res;
          },
          error:(err)=>{
            console.error("error in getting all the courses",err)
          }
        });
      }
    });
  }

  constructor(private _courseService: CourseService, private _route: ActivatedRoute) { }

}
