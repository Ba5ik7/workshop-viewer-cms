import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, take, takeUntil } from 'rxjs';
import { Category } from 'src/app/shared/interfaces/category.interface';
import { NavigationService } from 'src/app/shared/services/navigation/navigation.service';
import { WorkshopEditorService } from '../../workshop-editor.service';

@Component({
  selector: 'app-delete-category-modal',
  templateUrl: './delete-category-modal.component.html',
  styleUrls: ['./delete-category-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteCategoryModalComponent implements OnInit {

  destory: Subject<boolean> = new Subject();

  formLoading: boolean = false;

  deleteCategoryFormLevelMessage!: string;

  errorMessages: { [key: string]: string } = {
    matchString: 'Name does NOT match.',
  };

  deleteCategoryFormErrorMessages: { [key: string]: string } = {
    name: ''
  }

  deleteCategoryForm: FormGroup = this.formBuilder.group({
    _id: [this.data.category?._id, [Validators.required]],
    name: ['', [Validators.required]]
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { category: any },
    private dialogRef: MatDialogRef<DeleteCategoryModalComponent>,
    private changeDetectorRef: ChangeDetectorRef,
    private workshopEditorService: WorkshopEditorService,
    private navigationService: NavigationService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.initDeleteCategoryForm();
  }
  
  initDeleteCategoryForm(): void {
    this.deleteCategoryForm.statusChanges
    .pipe(takeUntil(this.destory))
    .subscribe(() => this.setErrorsMessages(this.deleteCategoryForm, this.deleteCategoryFormErrorMessages));
  
    this.workshopEditorService.deleteCategoryFormError$
    .pipe(takeUntil(this.destory))
    .subscribe((error) => {      
      this.requestInProgress();
      this.deleteCategoryFormLevelMessage = this.errorMessages['httpFailure'];
      this.changeDetectorRef.markForCheck();
    });
    
    this.workshopEditorService.deleteCategoryFormSuccess$
    .pipe(takeUntil(this.destory))
    .subscribe((category) => this.deleteCategorySuccuessful(category));
  }

  deleteCategorySuccuessful(category: Category): void {
    this.requestInProgress();
    this.navigationService.categories$
    .pipe(take(1))
    .subscribe((categories: Category[]) => {
      const newCategories = categories.filter((oldCategory) => oldCategory._id !== category._id);
      newCategories.push(category);
      this.navigationService.sectionNavListSub.next(newCategories);
    });
    this.dialogRef.close();
  }

  deleteCategory() {
    console.log(this.data);
    this.dialogRef.close();
  }

  requestInProgress(predicate: boolean = false): void {
    this.formLoading = predicate;
    this.dialogRef.disableClose = predicate;
  }

  setErrorsMessages(formGroup: FormGroup, formControlMessages: { [key: string]: string }): void {
    Object.keys(formGroup.controls).forEach(element => {
      const errors = formGroup.get(element)?.errors;
      if(errors) {         
        const error = Object.keys(errors)[0];
        formControlMessages[element] = this.errorMessages[error];
      }
    });
  }
}
