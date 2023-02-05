import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { Categories } from 'src/modules/entities/categories';
import { ConfigService } from 'src/modules/services/config.service';


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

  constructor(private config: ConfigService,
              private dialog: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
      this.form = new FormGroup({
        name: this.name,
        notes: this.notes
      })
   }

  ngOnInit(): void {

    this.request = this.data.request

    if(this.data.type == 'category' && this.request == 'update') {
      this.name.setValue(this.data.entities.name)
      this.notes.setValue(this.data.entities.notes)
    }

    this._checkTheme();
  }

  private _checkTheme() {
    const dialog = document.getElementsByClassName('mat-dialog-container')!
    if(dialog[0]) this.config.darkTheme ? dialog[0].classList.add('bag-dark') : dialog[0].classList.remove('bag-dark')
  }

  public save(): void {
    const data = this.form.getRawValue();
    this.dialog.close({id: this.data.id, request: this.request, data: data})
  }

}
