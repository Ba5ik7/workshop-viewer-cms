import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-category-modal',
  templateUrl: './edit-category-modal.component.html',
  styleUrls: ['./edit-category-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditCategoryModalComponent implements OnInit {

  editCategoryForm: FormGroup = this.formBuilder.group({
    categoryTitle: [this.data.category?.name, [Validators.required]]
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { category: any },
    private dialogRef: MatDialogRef<EditCategoryModalComponent>,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
  }

  editCategory() {
    console.log(this.data);
    this.dialogRef.close();
  }

}
