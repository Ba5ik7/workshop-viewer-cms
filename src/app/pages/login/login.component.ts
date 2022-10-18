import { HttpStatusCode } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { UserStateService } from 'src/app/shared/services/user-state/user-state.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('signInEmail') signInEmail!: ElementRef;

  destory: Subject<boolean> = new Subject();

  signInFormLevelMessage!: string;
  formLoading: boolean = false;

  signInFormErrorMessages: { [key: string]: string } = {
    email: '', password: ''
  }

  signInForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  errorMessages: { [key: string]: string } = {
    required: 'Required',
    email: 'Invalid email address',
    invalidPassword: 'At least 6 characters long and contain a number',
    signInUnauthorized: `Email or password doesn't match`,
    httpFailure: '😿 Sorry something bad happen. Try again or try refreshing the page.'
  };

  constructor(
    private loginService: LoginService,
    private userStateService: UserStateService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initSignForm();
  }

  signInClick(): void {
    this.requestInProgress(true);
    this.loginService.signIn(this.signInForm.value);    
  }

  initSignForm(): void {
    this.signInForm.statusChanges
    .pipe(takeUntil(this.destory))
    .subscribe(() => this.setErrorsMessages(this.signInForm, this.signInFormErrorMessages));
  
    this.loginService.signInFormError$
    .pipe(takeUntil(this.destory))
    .subscribe((error) => {      
      this.requestInProgress();
      if(error === HttpStatusCode.Unauthorized) {
        this.signInForm.get('email')?.setErrors({ signInUnauthorized: true });
        this.signInEmail.nativeElement.focus();
      } else {
        this.signInFormLevelMessage = this.errorMessages['httpFailure'];
      }
    });
    
    this.loginService.signInFormSuccess$
    .pipe(takeUntil(this.destory))
    .subscribe((user) => this.signSuccuessful(user));
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

  requestInProgress(predicate: boolean = false) {
    this.formLoading = predicate;
  }

  signSuccuessful(whatever: any): void {
    this.requestInProgress();
    this.userStateService.setUser(whatever);
  }

  test() {
    // this.loginService.test();
  }

}
