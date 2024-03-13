import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../Entities/Caregory.model';
import { CategoryService } from '../category.service';

@Component({
  selector: 'display-category',
  standalone: true,
  imports: [],
  templateUrl: './display-category.component.html',
  styleUrl: './display-category.component.scss'
})
export class DisplayCategoryComponent implements OnInit {

  ngOnInit(): void {
    this._categoryService.getCategoryList().subscribe({
      next: (res) => {
        this.catList = res;
        if (this.catId)
          this.cat = this.catList.find(c => c.id == this.catId);
      }
    })
  }
  constructor(private _categoryService: CategoryService) { }
  @Input()
  public catId!: number;
  public cat?: Category;
  public catList?: Category[];

}
