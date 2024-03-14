import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from './category.service';
import { HttpClientModule } from '@angular/common/http';
import { DisplayCategoryComponent } from './display-category/display-category.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    DisplayCategoryComponent,
  ],
  providers: [CategoryService],
  exports:[DisplayCategoryComponent]
})
export class CategoryModule { }
