import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-category-modal',
  templateUrl: './delete-category-modal.component.html',
  styleUrls: ['./delete-category-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteCategoryModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { category: any },
    private dialogRef: MatDialogRef<DeleteCategoryModalComponent>
    ) { }

  ngOnInit(): void {
  }

  deleteCategory() {
    console.log(this.data);
    this.dialogRef.close();
  }

}
