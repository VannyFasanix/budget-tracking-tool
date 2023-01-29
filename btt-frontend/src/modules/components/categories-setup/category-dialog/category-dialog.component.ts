import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent implements OnInit {

  form!: FormGroup;
  name: FormControl = new FormControl('');
  notes: FormControl = new FormControl('');

  constructor(private dialog: MatDialogRef<CategoryDialogComponent>) {
    this.form = new FormGroup({
      name: this.name,
      notes: this.notes
    })
   }

  ngOnInit(): void {

  }

  public save(): void {
    const data = this.form.getRawValue();
    this.dialog.close(data)
  }

}
