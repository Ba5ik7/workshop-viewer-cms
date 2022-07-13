import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, take, takeUntil } from 'rxjs';
import { Category } from 'src/app/shared/interfaces/category.interface';
import { NavigationService } from 'src/app/shared/services/navigation/navigation.service';
import { MatchStringValidator } from 'src/app/shared/validators/match-string.validator';
import { WorkshopEditorService } from '../../workshop-editor.service';

@Component({
  selector: 'app-delete-page-modal',
  templateUrl: './delete-page-modal.component.html',
  styleUrls: ['./delete-page-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeletePageModalComponent implements OnInit {

  destory: Subject<boolean> = new Subject();

  formLoading: boolean = false;

  deletePageFormLevelMessage!: string;

  errorMessages: { [key: string]: string } = {
    required: 'Required',
    matchString: 'Name does NOT match.',
  };

  deletePageFormErrorMessages: { [key: string]: string } = {
    name: ''
  }

  deletePageForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]]
  }, { validators: MatchStringValidator('name', this.data.page.name) });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { page: any },
    private dialogRef: MatDialogRef<DeletePageModalComponent>,
    private changeDetectorRef: ChangeDetectorRef,
    private workshopEditorService: WorkshopEditorService,
    private navigationService: NavigationService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.initDeletePageForm();
  }
  
  initDeletePageForm(): void {
    this.deletePageForm.statusChanges
    .pipe(takeUntil(this.destory))
    .subscribe(() => this.setErrorsMessages(this.deletePageForm, this.deletePageFormErrorMessages));
  
    this.workshopEditorService.deletePageFormError$
    .pipe(takeUntil(this.destory))
    .subscribe((error) => {      
      this.requestInProgress();
      this.deletePageFormLevelMessage = this.errorMessages['httpFailure'];
      this.changeDetectorRef.markForCheck();
    });
    
    this.workshopEditorService.deletePageFormSuccess$
    .pipe(takeUntil(this.destory))
    .subscribe((_id) => this.deletePageSuccuessful(_id));
  }

  deletePageSuccuessful(_id: string): void {
    this.requestInProgress();
    this.navigationService.categories$
    .pipe(take(1))
    .subscribe((categories: Category[]) => {
      const newCategories = categories.filter((oldCategory) => oldCategory._id !== _id);
      this.navigationService.setCategories(newCategories);
    });
    this.dialogRef.close();
  }

  deletePage() {
    this.requestInProgress(true);
    this.workshopEditorService.deletePage(this.data.page._id);
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
