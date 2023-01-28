import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/modules/services/config.service';

@Component({
  selector: 'app-expenses-table',
  templateUrl: './expenses-table.component.html',
  styleUrls: ['./expenses-table.component.scss']
})
export class ExpensesTableComponent implements OnInit {

  response: any[] = [];

  constructor(private http: HttpClient,
              private config: ConfigService) { }

  ngOnInit(): void {
    // this.http.get(this.config.url+'expenses').subscribe((res: any) => {
    //   this.response = res._embedded;
    // })

    this.http.get(this.config.url+'categories').subscribe((res: any) => {
      console.log(res)
    })

  }

}
