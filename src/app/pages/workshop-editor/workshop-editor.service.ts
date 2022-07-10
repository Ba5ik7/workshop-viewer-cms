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
}
