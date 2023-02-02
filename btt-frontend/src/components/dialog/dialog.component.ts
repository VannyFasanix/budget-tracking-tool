import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { Categories } from 'src/modules/entities/categories';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  form!: FormGroup;
  category: FormControl = new FormControl('');
  name: FormControl = new FormControl('');
  notes: FormControl = new FormControl('');

  categories: Categories[] = []
  request!: string

  constructor(private dialog: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = new FormGroup({
      name: this.name,
      notes: this.notes,
      category: this.category
    })
   }

  ngOnInit(): void {
    this.request = this.data.request
    this.categories = this.data?.categories;

    this.category.valueChanges.subscribe((id: number) => {
      const cat = this.categories.find((c: Categories) => c.id == id)
      this.name.setValue(cat?.name ? cat.name : "")
      this.notes.setValue(cat?.notes ? cat.notes : "")
    })
  }

  public save(): void {
    const data = this.form.getRawValue();
    this.dialog.close({request: this.request, data: data})
  }

}
