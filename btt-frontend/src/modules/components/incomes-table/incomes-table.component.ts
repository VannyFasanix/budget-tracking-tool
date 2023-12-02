import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/components/dialog/dialog.component';
import { Incomes } from 'src/modules/entities/incomes';
import { TransactionsService } from 'src/modules/services/transactions.service';

@Component({
  selector: 'app-incomes-table',
  templateUrl: './incomes-table.component.html',
  styleUrls: ['./incomes-table.component.scss']
})
export class IncomesTableComponent implements OnInit {

  constructor(private transaction: TransactionsService,
    public dialog: MatDialog) { }

  entityName: string = 'incomes'
  tableEntities!: {headers: any[], rows: any[]};
  incomes: any[] = [];
  checkboxes: {id: boolean}[] = [];

  ngOnInit(): void {
    this.transaction.getT(this.entityName).subscribe((res: Incomes[]) => {
      console.log(res)
      this.incomes = res

      this.tableEntities = {
        headers: Object.keys(this.incomes[0]),
        rows: this.incomes
      }
    })
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
          this.transaction.postT(this.entityName, result.data).subscribe((res: any) => console.log(res))
        } else if(result.request == 'update') {
          const id = result.id;
          const body = {
            date: result.data.date,
            category: result.data.category,
            store: result.data.store,
            amount: result.data.amount,
            notes: result.data.notes
          }
          this.transaction.updateT(this.entityName, id, body).subscribe((res: any) => console.log(res))
        } else if(result.request == 'delete') {
          const id: number = result.data.expense;
          this.transaction.deleteT(this.entityName, id).subscribe((res: any) => console.log(res))
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

    this.transaction.deleteT(this.entityName, ids).subscribe((res: any) => console.log(res))
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
