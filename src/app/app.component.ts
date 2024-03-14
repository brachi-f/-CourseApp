import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './pages/header/header.component';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user/user.service';
import { AuthService } from './services/auth.service';
import { CourseModule } from './course/course.module';
import { CategoryModule } from './category/category.module';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, RouterOutlet, HttpClientModule, CourseModule,
    HomePageComponent, HeaderComponent, FormsModule, ReactiveFormsModule, CategoryModule
  ],
  providers: [AuthService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Courses';
}
