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

  deleteCategoryFormSuccessSubject = new Subject<string>();
  deleteCategoryFormSuccess$ = this.deleteCategoryFormSuccessSubject.asObservable();

  deleteCategory(_id: string): void {
    this.httpClient.post<Category>('/api/navigation/category/delete-category-and-workshops', { _id })
    .subscribe({
      next: () => this.deleteCategoryFormSuccessSubject.next(_id),
      error: (httpError: HttpErrorResponse) => this.deleteCategoryFormErrorSubject.next(httpError.status)
    });
  }


  sortCategoryFormErrorSubject = new Subject<number>();
  sortCategoryFormError$ = this.sortCategoryFormErrorSubject.asObservable();

  sortCategoryFormSuccessSubject = new Subject<Category[]>();
  sortCategoryFormSuccess$ = this.sortCategoryFormSuccessSubject.asObservable();

  sortCategories(categories: Category[]): void {
    this.httpClient.post<Category[]>('/api/navigation/category/sort-categories', categories)
    .subscribe({
      next: () => this.sortCategoryFormSuccessSubject.next(categories),
      error: (httpError: HttpErrorResponse) => this.sortCategoryFormErrorSubject.next(httpError.status)
    });
  }


  createPageFormErrorSubject = new Subject<number>();
  createPageFormError$ = this.createPageFormErrorSubject.asObservable();

  createPageFormSuccessSubject = new Subject<WorkshopDocument>();
  createPageFormSuccess$ = this.createPageFormSuccessSubject.asObservable();

  createPage(page: WorkshopDocument): void {
    this.httpClient.post<WorkshopDocument>('/api/navigation/page/create-page', page)
    .subscribe({
      next: (createdPage) => this.createPageFormSuccessSubject.next(createdPage),
      error: (httpError: HttpErrorResponse) => this.createPageFormErrorSubject.next(httpError.status)
    });
  }


  deletePageFormErrorSubject = new Subject<number>();
  deletePageFormError$ = this.deletePageFormErrorSubject.asObservable();

  deletePageFormSuccessSubject = new Subject<WorkshopDocument>();
  deletePageFormSuccess$ = this.deletePageFormSuccessSubject.asObservable();

  deletePage(page: WorkshopDocument): void {
    this.httpClient.post<WorkshopDocument>('/api/navigation/page/delete-page-and-update-category', page)
    .subscribe({
      next: () => this.deletePageFormSuccessSubject.next(page),
      error: (httpError: HttpErrorResponse) => this.deletePageFormErrorSubject.next(httpError.status)
    });
  }


  editPageFormErrorSubject = new Subject<number>();
  editPageFormError$ = this.editPageFormErrorSubject.asObservable();

  editPageFormSuccessSubject = new Subject<WorkshopDocument>();
  editPageFormSuccess$ = this.editPageFormSuccessSubject.asObservable();

  editPageNameAndSummary(page: WorkshopDocument): void {
    this.httpClient.post<WorkshopDocument>('/api/navigation/page/edit-page-name', page)
    .subscribe({
      next: () => this.editPageFormSuccessSubject.next(page),
      error: (httpError: HttpErrorResponse) => this.editPageFormErrorSubject.next(httpError.status)
    });
  }
}
