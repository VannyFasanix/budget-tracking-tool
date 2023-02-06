import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/modules/services/config.service';
import { Categories } from '../entities/categories';
import { Expenses } from '../entities/expenses';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  categories: Categories[] = [];
  expenses: Expenses[] = [];

  private _categoriesModified = new Subject<boolean>();
  public categoriesModified = this._categoriesModified.asObservable();

  constructor(private http: HttpClient,
              private config: ConfigService) {

              }

  public setupTransactions(): any {
    return new Promise<any>((resolve, reject) => {
      this.getTransactions().subscribe({
        next: (res: any) => {
          this.categories = res.categories;
          this.expenses = res.expenses;
          resolve(true);
        },
        error: (err: any) => {
          reject(err);
        }
      });
    })
  }

  public getTransactions(): Observable<any>  {
    return this.http.get(this.config.url+'transactions/master')
  }

  public postCategory(body: any) {
    this.http.post(this.config.url+"categories", body).subscribe((res: any) => {
      this._categoriesModified.next(true)
    })
  }

  public getCategories(): any {
    this.http.get(this.config.url+'categories/master').subscribe((res: any) => {
      this.categories = res
    })
  }

  public getExpenses(): any {
    this.http.get(this.config.url+'expenses/master').subscribe((res: any) => {
      this.expenses = res
    })
  }

  public updateCategory(id: number, body: any): any {
    this.http.put(this.config.url+"categories"+`/${id}`, body).subscribe((res: any) => {
      this._categoriesModified.next(true)
    })
  }

  public deleteCategory(id: number): any {
    this.http.delete(this.config.url+"categories"+`/${id}`).subscribe((res: any) => {
      this.categories.splice(this.categories.find((c: Categories) => c.id == id)?.id!, 1)
      this._categoriesModified.next(true)
    })
  }

}
