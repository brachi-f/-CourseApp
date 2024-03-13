import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../category.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [CategoryService]
})
export class CategoryModule { }
