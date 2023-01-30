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
  public categoryAdded!: Subject<boolean>;

  constructor(private http: HttpClient,
              private config: ConfigService) {
                this.categoryAdded = new Subject<boolean>();
              }

  public setupTransactions(): any {
    this.getCategories();
    this.getExpenses();
  }

  public postTransaction(url: string, body: Categories | Expenses) {
    this.http.post(this.config.url+url, body).subscribe((res: any) => {
      this.categories.push(body)
      this.categoryAdded.next(true)
    })
  }

  public getCategories(): any {
    this.http.get(this.config.url+'categories').subscribe((res: any) => {
      this.categories = res._embedded.categoryList
    })
  }

  public getExpenses(): any {
    this.http.get(this.config.url+'expenses').subscribe((res: any) => {
      this.expenses = res._embedded.expenseList
    })
  }

  public updateTransaction(url: string, id: number, body: any): any {
    this.http.put(this.config.url+url+`/${id}`, body).subscribe((res: any) => {
      this._updateProperties(this.categories, id, body);
      this.categoryAdded.next(true)
    })
  }

  public deleteTransaction(url: string, id: number): any {
    this.http.delete(this.config.url+url+`/${id}`).subscribe((res: any) => {
      this.categories.splice(this.categories.find((c: Categories) => c.id == id)?.id!, 1)
      this.categoryAdded.next(true)
    })
  }

  private _updateProperties(array: any[], id: number, body: any): void {
    const idx = array.findIndex((e: any) => e.id == id)
    const keys:  any = Object.keys(body)
    keys.map((key: any) => {
      if(body[key]) {
        array[idx][key] = body[key]
      }
    })
  }
}
