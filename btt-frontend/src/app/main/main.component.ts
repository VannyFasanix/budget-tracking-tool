import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/modules/services/config.service';
import { TransactionsService } from 'src/modules/services/transactions.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private config: ConfigService,
              private transaction: TransactionsService) { }

  selectedFlag: string = 'dashboard';

  ngOnInit(): void {

    this.config.flagChanged.subscribe((flag: string) => {
      this.selectedFlag = flag;
    })

    this.transaction.setupTransactions();

  }

}
