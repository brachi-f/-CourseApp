import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'add-course',
  standalone: true,
  imports: [],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.scss'
})
export class AddCourseComponent implements OnInit{
  ngOnInit(): void {
    console.log("add-course-component")
  }

}
