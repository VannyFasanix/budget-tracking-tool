import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Categories } from 'src/modules/entities/categories';
import { TransactionsService } from 'src/modules/services/transactions.service';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';


@Component({
  selector: 'app-categories-setup',
  templateUrl: './categories-setup.component.html',
  styleUrls: ['./categories-setup.component.scss']
})
export class CategoriesSetupComponent implements OnInit {

  categories: Categories[] = [];

  constructor(private transaction: TransactionsService,
              public dialog: MatDialog) { }

  ngOnInit(): void {

    this.categories = this.transaction.categories;

    this.transaction.categoryAdded.subscribe((res: boolean) => {
      this.categories = this.transaction.categories;
    })

  }

  public openCategoryDialog(option: string) {

    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      height: '400px',
      width: '500px',
      hasBackdrop: true,
      disableClose: false,
      panelClass: 'mat-dialog-custom-white',
      data: {
        categories: option == 'update' ? this.categories : [],
        request: option
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result)
        if(result.request == 'add') {
          this.transaction.postTransaction('categories',result.data)
        } else if(result.request == 'update') {
          const id = result.data.category;
          const body = {
            name: result.data.name,
            notes: result.data.notes
          }
          this.transaction.updateTransaction('categories', id, body)
        } else if(result.request == 'delete') {
          const id = result.data.category;
          this.transaction.deleteTransaction('categories', id)
        }

    });
  }


}
