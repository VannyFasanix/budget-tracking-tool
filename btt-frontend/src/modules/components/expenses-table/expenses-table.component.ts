
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/components/dialog/dialog.component';
import { Expenses } from 'src/modules/entities/expenses';
import { TransactionsService } from 'src/modules/services/transactions.service';

@Component({
  selector: 'app-expenses-table',
  templateUrl: './expenses-table.component.html',
  styleUrls: ['./expenses-table.component.scss']
})
export class ExpensesTableComponent implements OnInit {

  constructor(private transaction: TransactionsService,
              public dialog: MatDialog) { }

  entityName: string = 'expenses'
  tableEntities!: {headers: any[], rows: any[]};
  expenses: any[] = [];
  checkboxes: {id: boolean}[] = [];

  ngOnInit(): void {

    this.transaction.getT(this.entityName).subscribe((res: Expenses[]) => {
      console.log(res)
      this.expenses = res

      this.tableEntities = {
        headers: Object.keys(this.expenses[0]),
        rows: this.expenses
      }
    })

  }

  public openExpensesDialog(option: any) {

    const dialogRef = this.dialog.open(DialogComponent, {
      height: '600px',
      width: '500px',
      hasBackdrop: true,
      disableClose: false,
      panelClass: 'mat-dialog-custom-white',
      data: {
        type: 'expense',
        id: option.id,
        entities: this._manageEntities(option),
        request: option?.operation ? option.operation : option
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result)
        if(result.request == 'add') {
          if(result?.data?.category)
            result.data.category = result.data.category.id

          this.transaction.postT(this.entityName, result.data).subscribe((res: any) => {
            console.log(res)
          })
        } else if(result.request == 'update') {
          const id = result.id;
          const body = {
            date: result.data.date,
            category: result.data.category,
            store: result.data.store,
            amount: result.data.amount,
            notes: result.data.notes
          }
          this.transaction.updateT(this.entityName, id, body).subscribe((res: any) => {
            console.log(res)
          })
        } else if(result.request == 'delete') {
          const id = result.data.expense;
          this.transaction.deleteT(this.entityName, id).subscribe((res: any) => {
            console.log(res)
          })
        }

    });
  }

  public updateEntity(e: any) {
    if(e instanceof Array) {
      this.checkboxes = e;
    } else {
      this.openExpensesDialog(e)
    }
  }

  public deleteExpense() {
    let ids: number[] = []
    this.checkboxes.map((e: any, i: number) => {
      if(e.checked)
        ids.push(this.expenses[i].id)
    })

    this.transaction.deleteT(this.entityName, ids)
  }

  private _manageEntities(option: any) {
    let entities: any;

     if(option.operation == 'update') {
      entities = option.entities ? option.entities : this.expenses ? this.expenses : []
    } else if (option.operation == 'delete') {
      entities = this.expenses
    }

    return entities
  }

  public canDelete() {
    let deletableExpenses: number = 0;
    this.checkboxes.map((e: any, i: number) => {
      if(e.checked)
      deletableExpenses++
    })

    const e = document.getElementById('delete')!
    if(deletableExpenses == 0) {
      if(e) {
        e.classList.add('disabledBtn')
      }
    } else {
      e.classList.remove('disabledBtn')
    }

    return deletableExpenses == 0
  }

}
