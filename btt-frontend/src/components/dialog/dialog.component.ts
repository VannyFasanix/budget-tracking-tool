import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { Categories } from 'src/modules/entities/categories';
import { ConfigService } from 'src/modules/services/config.service';
import { TransactionsService } from 'src/modules/services/transactions.service';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  form!: FormGroup;
  request!: string;

  //FORMS
  name: FormControl = new FormControl('')
  notes: FormControl = new FormControl('')

  date: FormControl = new FormControl('')
  store: FormControl = new FormControl('')
  amount: FormControl = new FormControl('')
  category: FormControl = new FormControl('')

  categories: Categories[] = []

  constructor(private config: ConfigService,
              private transactionSvc: TransactionsService,
              private dialog: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

      if(this.data.type == 'category') {
        this.form = new FormGroup({
          name: this.name,
          notes: this.notes
        })
      }

      if(this.data.type == 'expense') {
        this.form = new FormGroup({
          date: this.date,
          store: this.store,
          amount: this.amount,
          category: this.category,
          notes: this.notes
        })
      }

   }

  ngOnInit(): void {

    this.request = this.data.request

    if(this.data.type == 'category' && this.request == 'update') {
      this.name.setValue(this.data.entities.name)
      this.notes.setValue(this.data.entities.notes)
    }

    if(this.data.type == 'expense') {
      this.categories = this.transactionSvc.categories;
      if(this.request == 'update') {
        this.date.setValue(this.data.entities.date)
        this.store.setValue(this.data.entities.store)
        this.amount.setValue(this.data.entities.amount)
        this.category.setValue(this.data.entities.category.id)
        this.notes.setValue(this.data.entities.notes)
      }
    }

    this._checkTheme();
  }

  private _checkTheme() {
    const dialog = document.getElementsByClassName('mat-dialog-container')!
    if(dialog[0]) this.config.darkTheme ? dialog[0].classList.add('bag-dark') : dialog[0].classList.remove('bag-dark')
  }

  public save(): void {
    let data = this.form.getRawValue();

    if(this.data.type == 'expense') {
      const c = this.categories.find((c: Categories) => {return c.id == data['category']})
      data['category'] = c;
    }

    this.dialog.close({id: this.data.id, request: this.request, data: data})
  }

}
