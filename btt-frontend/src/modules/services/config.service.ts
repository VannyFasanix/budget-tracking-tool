import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MenuItem } from '../entities/menuItem';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  url!: string;
  title!: string;
  menu: MenuItem[] = [];

  private _flagChanged = new Subject<any>();
  public flagChanged = this._flagChanged.asObservable();

  darkTheme: boolean = true;

  constructor(private http: HttpClient) {
    this.url = environment?.url;
    this.title = environment?.title;
  }

  public nextFlagChange(flag: string) {
    this._flagChanged.next(flag)
  }

  public async setupMenu(): Promise<any>{
    return new Promise<any>((resolve, reject) => {
      this.getMenu().subscribe({
        next: (res: any) => {
          this.menu = res;
          resolve(true);
        },
        error: (err: any) => {
          reject(err);
        }
      });
    })

  }

  public getMenu(): Observable<any> {
    return this.http.get(this.url+"menu/master")
  }

}
