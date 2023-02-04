import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EventEmitter } from '@angular/core'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() entities!: {headers: any[], rows: any[]};
  @Input() edit: boolean = false;
  @Input() sortByDate: boolean = true;

  @Output() update: EventEmitter<{entity: any, operation: string}> = new EventEmitter()

  keys: any[] = []
  searchString: FormControl = new FormControl('');
  _rows: any[] = []

  constructor() { }

  ngOnInit(): void {

    if(this.entities.headers.includes('id'))
      this.entities.headers.splice(this.entities.headers.findIndex((header: any) => {return header == 'id'}),1)

    this.keys = [...this.entities.headers]

    if(this.edit)
      this.entities.headers.push('edit')

    this._rows = [...this.entities.rows]

    this.searchString.valueChanges.subscribe((s: string) => {
      this.search(s)
    })
  }

  public search(s: string) {
    let newRows: any[] = [];
    this.entities.rows = [...this._rows];

    this.entities.rows.map((row: any) => {
      this.keys.map((key: string) => {
        if(row[key].toUpperCase().includes(s.toUpperCase())) {
          newRows.push(row)
        }
      })
    }).filter((row: any) => row != undefined)

    this.entities.rows = [...new Set(newRows)]
  }

  public showFilter() {
    const e = document.getElementById('dropdownRadio')!
    e.classList.toggle('hidden')
  }

  public getVal(val: any) {
    return val instanceof Object ? val.name : val
  }

  public updateDialog(entity: any, operation: string) {
    this.update.emit({entity, operation})
  }

}
