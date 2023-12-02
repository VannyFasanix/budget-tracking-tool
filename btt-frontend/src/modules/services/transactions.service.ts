import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/modules/services/config.service';
import { Categories } from '../entities/categories';
import { Expenses } from '../entities/expenses';
import { Observable, Subject } from 'rxjs';
import { Incomes } from '../entities/incomes';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  categories: Categories[] = [];
  expenses: Expenses[] = [];
  incomes: Incomes[] = [];

  constructor(private http: HttpClient,
              private config: ConfigService) {

              }

  //TRANSACTIONS

  public setupTransactions(): any {
    return new Promise<any>((resolve, reject) => {
      this.http.get(this.config.url+'transactions/master').subscribe({
        next: (res: any) => {
          this.categories = res.categories;
          this.expenses = res.expenses;
          this.incomes = res.incomes;
          resolve(true);
        },
        error: (err: any) => {
          reject(err);
        }
      });
    })
  }

  public getT(entityName: string): Observable<any> {
    return this.http.get(this.config.url+entityName+"/master")
  }

  public postT(entityName: string, body: any): Observable<any> {
    return this.http.post(this.config.url+entityName, body)
  }

  public updateT(entityName: string, id: number, body: any): Observable<any> {
    return this.http.put(this.config.url+entityName+`/${id}`, body)
  }

  public deleteT(entityName: string, ids?: number | number[]): Observable<any> {
    return _.isNumber(ids) ? this.http.delete(this.config.url+entityName+`/${ids}`) : this.http.delete(this.config.url+entityName, {body: ids})
  }

}
