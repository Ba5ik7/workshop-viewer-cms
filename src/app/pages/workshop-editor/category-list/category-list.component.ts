import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateCategoryModalComponent } from './create-category-modal/create-category-modal.component';
import { DeleteCategoryModalComponent } from './delete-category-modal/delete-category-modal.component';
import { EditCategoryModalComponent } from './edit-category-modal/edit-category-modal.component';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  @Input() categories!: any[] | null;

  constructor(public matDialog: MatDialog) {
  }

  ngOnInit(): void { }

  createCategory(): void {
    this.matDialog.open(CreateCategoryModalComponent, { width: '400px' });
  }
  
  deleteCategory(event: Event, category: any): void {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.matDialog.open(DeleteCategoryModalComponent, { width: '400px', data: { category }});
  }

  editCategory(event: Event, category: any): void {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.matDialog.open(EditCategoryModalComponent, { width: '400px', data: { category }});
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.categories ?? [], event.previousIndex, event.currentIndex);
    this.categories?.map((category, index) => category.sortId = index);
    console.log(this.categories);
  }
}
