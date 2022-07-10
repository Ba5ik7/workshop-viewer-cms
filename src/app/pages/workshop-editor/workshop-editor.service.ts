import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay, Subject, tap } from 'rxjs';
import { Category } from 'src/app/shared/interfaces/category.interface';
import { WorkshopDocument } from '../../shared/interfaces/workshop-document.interface';

@Injectable({
  providedIn: 'root'
})
export class WorkshopEditorService {

  constructor(private httpClient: HttpClient) { }

  createCategoryFormErrorSubject = new Subject<number>();
  createCategoryFormError$ = this.createCategoryFormErrorSubject.asObservable();

  createCategoryFormSuccessSubject = new Subject<Category>();
  createCategoryFormSuccess$ = this.createCategoryFormSuccessSubject.asObservable();

  createCategory(category: Category): void {
    this.httpClient.post<Category>('/api/navigation/category/create-category', category)
    .subscribe({
      next: (createdCategory) => this.createCategoryFormSuccessSubject.next(createdCategory),
      error: (httpError: HttpErrorResponse) => this.createCategoryFormErrorSubject.next(httpError.status)
    });
  }


  editCategoryFormErrorSubject = new Subject<number>();
  editCategoryFormError$ = this.editCategoryFormErrorSubject.asObservable();

  editCategoryFormSuccessSubject = new Subject<Category>();
  editCategoryFormSuccess$ = this.editCategoryFormSuccessSubject.asObservable();

  editCategoryNameAndSummary(category: Category): void {
    this.httpClient.post<Category>('/api/navigation/category/edit-category-name-and-summary', category)
    .subscribe({
      next: (editedCategory) => this.editCategoryFormSuccessSubject.next(editedCategory),
      error: (httpError: HttpErrorResponse) => this.editCategoryFormErrorSubject.next(httpError.status)
    });
  }


  deleteCategoryFormErrorSubject = new Subject<number>();
  deleteCategoryFormError$ = this.deleteCategoryFormErrorSubject.asObservable();

  deleteCategoryFormSuccessSubject = new Subject<Category>();
  deleteCategoryFormSuccess$ = this.deleteCategoryFormSuccessSubject.asObservable();

  deleteCategory(category: Category): void {
    this.httpClient.post<Category>('/api/navigation/category/delete-category-and-workshops', category)
    .subscribe({
      next: (editedCategory) => this.deleteCategoryFormSuccessSubject.next(editedCategory),
      error: (httpError: HttpErrorResponse) => this.deleteCategoryFormErrorSubject.next(httpError.status)
    });
  }
}
