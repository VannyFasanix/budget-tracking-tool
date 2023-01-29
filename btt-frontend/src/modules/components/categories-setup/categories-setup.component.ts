import { Component, OnInit } from '@angular/core';
import { Categories } from 'src/modules/entities/categories';
import { TransactionsService } from 'src/modules/services/transactions.service';


@Component({
  selector: 'app-categories-setup',
  templateUrl: './categories-setup.component.html',
  styleUrls: ['./categories-setup.component.scss']
})
export class CategoriesSetupComponent implements OnInit {

  categories: Categories[] = [];

  constructor(private transaction: TransactionsService) { }

  ngOnInit(): void {

    this.categories = this.transaction.categories;

  }


}
