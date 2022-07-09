import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteCategoryModalComponent } from './delete-category-modal/delete-category-modal.component';
import { EditCategoryModalComponent } from './edit-category-modal/edit-category-modal.component';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryListComponent implements OnInit {

  @Input() categories!: any[] | null;

  constructor(public matDialog: MatDialog) {
  }

  ngOnInit(): void { }

  createCategory(): void {

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
}
