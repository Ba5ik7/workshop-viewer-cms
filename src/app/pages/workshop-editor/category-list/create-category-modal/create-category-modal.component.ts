import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-category-modal',
  templateUrl: './create-category-modal.component.html',
  styleUrls: ['./create-category-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCategoryModalComponent implements OnInit {

  createCategoryForm: FormGroup = this.formBuilder.group({
    categoryTitle: ['', [Validators.required]]
  });

  constructor(
    private dialogRef: MatDialogRef<CreateCategoryModalComponent>,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
  }

  createCategory() {
    this.dialogRef.close();
  }

}
