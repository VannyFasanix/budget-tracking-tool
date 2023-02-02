
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/components/dialog/dialog.component';
import { TransactionsService } from 'src/modules/services/transactions.service';

@Component({
  selector: 'app-expenses-table',
  templateUrl: './expenses-table.component.html',
  styleUrls: ['./expenses-table.component.scss']
})
export class ExpensesTableComponent implements OnInit {

  constructor(private transaction: TransactionsService,
              public dialog: MatDialog) { }

  tableEntities!: {headers: any[], rows: any[]};
  expenses: any[] = [];

  ngOnInit(): void {

    this.expenses = this.transaction.expenses;

    this.tableEntities = {
      headers: Object.keys(this.expenses[0]),
      rows: this.expenses
    }
  }

  public openCategoryDialog(option: string) {

    const dialogRef = this.dialog.open(DialogComponent, {
      height: '400px',
      width: '500px',
      hasBackdrop: true,
      disableClose: false,
      panelClass: 'mat-dialog-custom-white',
      data: {
        categories: option != 'add' ? this.expenses : [],
        request: option
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result)
        if(result.request == 'add') {
          this.transaction.postCategory(result.data)
        } else if(result.request == 'update') {
          const id = result.data.category;
          const body = {
            name: result.data.name,
            notes: result.data.notes
          }
          this.transaction.updateCategory(id, body)
        } else if(result.request == 'delete') {
          const id = result.data.category;
          this.transaction.deleteCategory(id)
        }

    });
  }

}
