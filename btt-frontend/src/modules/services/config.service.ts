import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  url!: string;

  private _flagChanged = new Subject<any>();
  public flagChanged = this._flagChanged.asObservable();

  constructor() {
    this.url = environment?.url;
  }

  public nextFlagChange(flag: string) {
    this._flagChanged.next(flag)
  }

}
