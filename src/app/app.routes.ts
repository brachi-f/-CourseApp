import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: HomePageComponent },
    { path: "user", loadComponent: () => import('./user/user.module').then(u => u.UserModule) },
    { path: "course", loadComponent: () => import('./course/course.module').then(c => c.CourseModule) },
    { path: "**", component: NotFoundComponent }
]