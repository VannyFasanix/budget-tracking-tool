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

  private _expensesModified = new Subject<boolean>();
  public expensesModified = this._expensesModified.asObservable();

  constructor(private http: HttpClient,
              private config: ConfigService) {

              }

  //TRANSACTIONS

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

  //CATEGORIES

  private _getCategories(): Observable<any> {
    return this.http.get(this.config.url+'categories/master')
  }

  public getCategories(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this._getCategories().subscribe({
        next: (res: any) => {
          this.categories = res;
          this._categoriesModified.next(true)
        },
        error: (err: any) => {
          reject(err);
        }
      })
    })
  }

  public postCategory(body: any) {
    this.http.post(this.config.url+"categories", body, {responseType: 'text'}).subscribe((res: any) => {
      this.getCategories()
    })
  }

  public updateCategory(id: number, body: any): any {
    this.http.put(this.config.url+"categories"+`/${id}`, body).subscribe((res: any) => {
      this.getCategories()
    })
  }

  public deleteCategory(id: number): any {
    this.http.delete(this.config.url+"categories"+`/${id}`).subscribe((res: any) => {
      this.getCategories()
    })
  }

  public deleteCategories(ids: number[]): any {
    this.http.delete(this.config.url+"categories",{body: ids}).subscribe((res: any) => {
      this.getCategories()
    })
  }

  //EXPENSES

  private _getExpenses(): Observable<any> {
    return this.http.get(this.config.url+'expenses/master')
  }

  public getExpenses(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this._getExpenses().subscribe({
        next: (res: any) => {
          this.expenses = res;
          this._expensesModified.next(true)
        },
        error: (err: any) => {
          reject(err);
        }
      })
    })
  }

  public postExpense(body: any) {
    this.http.post(this.config.url+"expenses", body, {responseType: 'text'}).subscribe((res: any) => {
      this.getExpenses()
    })
  }

  public updateExpense(id: number, body: any): any {
    this.http.put(this.config.url+"expenses"+`/${id}`, body).subscribe((res: any) => {
      this.getExpenses()
    })
  }

  public deleteExpense(id: number): any {
    this.http.delete(this.config.url+"expenses"+`/${id}`).subscribe((res: any) => {
      this.getExpenses()
    })
  }

  public deleteExpenses(ids: number[]): any {
    this.http.delete(this.config.url+"expenses",{body: ids}).subscribe((res: any) => {
      this.getExpenses()
    })
  }



}
