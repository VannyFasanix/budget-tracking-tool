import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/modules/services/config.service';
import { Categories } from '../entities/categories';
import { Expenses } from '../entities/expenses';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  categories: Categories[] = [];
  expenses: Expenses[] = [];

  constructor(private http: HttpClient,
              private config: ConfigService) { }

  public setupTransactions(): any {
    this.http.get(this.config.url+'categories').subscribe((res: any) => {
      this.categories = res._embedded.categoryList
    })
  }
}
