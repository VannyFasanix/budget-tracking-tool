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

  public postTransaction(url: string, body: any) {
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
}
