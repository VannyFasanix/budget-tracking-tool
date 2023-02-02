import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Categories } from 'src/modules/entities/categories';
import { TransactionsService } from 'src/modules/services/transactions.service';
import { DialogComponent } from '../../../components/dialog/dialog.component';


@Component({
  selector: 'app-categories-setup',
  templateUrl: './categories-setup.component.html',
  styleUrls: ['./categories-setup.component.scss']
})
export class CategoriesSetupComponent implements OnInit {

  categories: Categories[] = [];
  tableEntities!: {headers: any[], rows: any[]};

  constructor(private transaction: TransactionsService,
              public dialog: MatDialog) { }

  ngOnInit(): void {

    this.categories = this.transaction.categories;

    this.transaction.categoriesModified.subscribe((res: boolean) => {
      this.categories = this.transaction.categories;
    })

    this.tableEntities = {
      headers: Object.keys(this.categories[0]),
      rows: this.categories
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
        categories: option != 'add' ? this.categories : [],
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
