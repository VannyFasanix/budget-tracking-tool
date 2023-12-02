import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Categories } from 'src/modules/entities/categories';
import { TransactionsService } from 'src/modules/services/transactions.service';
import { DialogComponent } from '../../../components/dialog/dialog.component';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.scss']
})
export class CategoriesTableComponent implements OnInit {

  entityName: string = 'categories'
  categories: Categories[] = [];
  tableEntities!: {headers: any[], rows: any[]};
  checkboxes: {id: boolean}[] = [];

  constructor(private transaction: TransactionsService,
              public dialog: MatDialog) { }

  ngOnInit(): void {

    this.transaction.getT(this.entityName).subscribe((res: Categories[]) => {
      console.log(res)
      this.categories = res

      this.tableEntities = {
        headers: Object.keys(this.categories[0]),
        rows: this.categories
      }
    });

  }

  public openCategoryDialog(option: any) {

    const dialogRef = this.dialog.open(DialogComponent, {
      height: '400px',
      width: '500px',
      hasBackdrop: true,
      disableClose: false,
      panelClass: 'mat-dialog-custom-white',
      data: {
        type: 'category',
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
            name: result.data.name,
            notes: result.data.notes
          }
          this.transaction.updateT(this.entityName, id, body).subscribe((res: any) => console.log(res))
        } else if(result.request == 'delete') {
          const id = result.data.category;
          this.transaction.deleteT(this.entityName, id).subscribe((res: any) => console.log(res))
        }

    });
  }

  private _manageEntities(option: any) {
    let entities: any;

     if(option.operation == 'update') {
      entities = option.entities ? option.entities : this.categories ? this.categories : []
    } else if (option.operation == 'delete') {
      entities = this.categories
    }

    return entities
  }

  public updateEntity(e: any) {
    if(e instanceof Array) {
      this.checkboxes = e;
    } else {
      this.openCategoryDialog(e)
    }
  }

  public deleteCategories() {
    let ids: number[] = []
    this.checkboxes.map((e: any, i: number) => {
      if(e.checked)
        ids.push(this.categories[i].id)
    })

    this.transaction.deleteT(this.entityName, ids).subscribe((res: any) => console.log(res))
  }

  public canDelete() {
    let deletableCategories: number = 0;
    this.checkboxes.map((e: any, i: number) => {
      if(e.checked)
        deletableCategories++
    })

    const e = document.getElementById('delete')!
    if(deletableCategories == 0) {
      if(e) {
        e.classList.add('disabledBtn')
      }
    } else {
      e.classList.remove('disabledBtn')
    }

    return deletableCategories == 0
  }
}
