import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/components/dialog/dialog.component';
import { TransactionsService } from 'src/modules/services/transactions.service';

@Component({
  selector: 'app-incomes-table',
  templateUrl: './incomes-table.component.html',
  styleUrls: ['./incomes-table.component.scss']
})
export class IncomesTableComponent implements OnInit {

  constructor(private transaction: TransactionsService,
    public dialog: MatDialog) { }

  tableEntities!: {headers: any[], rows: any[]};
  incomes: any[] = [];
  checkboxes: {id: boolean}[] = [];

  ngOnInit(): void {
    this.incomes = this.transaction.incomes;

    this.transaction.incomesModified.subscribe((res: boolean) => {
      this.incomes = this.transaction.incomes;

      this.tableEntities = {
        headers: Object.keys(this.incomes[0]),
        rows: this.incomes
      }
    })

    this.tableEntities = {
      headers: Object.keys(this.incomes[0]),
      rows: this.incomes
    }
  }

  public openIncomesDialog(option: any) {

    const dialogRef = this.dialog.open(DialogComponent, {
      height: '600px',
      width: '500px',
      hasBackdrop: true,
      disableClose: false,
      panelClass: 'mat-dialog-custom-white',
      data: {
        type: 'income',
        id: option.id,
        entities: this._manageEntities(option),
        request: option?.operation ? option.operation : option
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result)
        if(result.request == 'add') {
          this.transaction.postExpense(result.data)
        } else if(result.request == 'update') {
          const id = result.id;
          const body = {
            date: result.data.date,
            category: result.data.category,
            store: result.data.store,
            amount: result.data.amount,
            notes: result.data.notes
          }
          this.transaction.updateExpense(id, body)
        } else if(result.request == 'delete') {
          const id = result.data.expense;
          this.transaction.deleteExpense(id)
        }

    });
  }

  public updateEntity(e: any) {
    if(e instanceof Array) {
      this.checkboxes = e;
    } else {
      this.openIncomesDialog(e)
    }
  }

  public deleteIncome() {
    let ids: number[] = []
    this.checkboxes.map((e: any, i: number) => {
      if(e.checked)
        ids.push(this.incomes[i].id)
    })

    this.transaction.deleteExpenses(ids)
  }

  private _manageEntities(option: any) {
    let entities: any;

     if(option.operation == 'update') {
      entities = option.entities ? option.entities : this.incomes ? this.incomes : []
    } else if (option.operation == 'delete') {
      entities = this.incomes
    }

    return entities
  }

  public canDelete() {
    let deletableIncomes: number = 0;
    this.checkboxes.map((e: any, i: number) => {
      if(e.checked)
      deletableIncomes++
    })

    const e = document.getElementById('delete')!
    if(deletableIncomes == 0) {
      if(e) {
        e.classList.add('disabledBtn')
      }
    } else {
      e.classList.remove('disabledBtn')
    }

    return deletableIncomes == 0
  }

}
