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
  @Input() sortByDate: boolean = false;
  @Input() search: boolean = false;

  @Output() update: EventEmitter<{id: number, entities: any, operation: string} | any[]> = new EventEmitter()

  keys: any[] = []
  searchString: FormControl = new FormControl('');
  _rows: any[] = []
  checkboxes: any[] = []
  sAvalue: boolean = false;

  constructor() { }

  ngOnInit(): void {

    if(this.entities.headers.includes('id'))
      this.entities.headers.splice(this.entities.headers.findIndex((header: any) => {return header == 'id'}),1)

    this.keys = [...this.entities.headers]

    if(this.edit)
      this.entities.headers.push('edit')

    this._rows = [...this.entities.rows]

    this.searchString.valueChanges.subscribe((s: string) => {
      this._search(s)
    })

    this.entities.rows.map((r: any) => {
      this.checkboxes.push({checked: false, visible: true, id: r.id})
    })

  }

  private _search(s: string) {
    let newRows: any[] = [];
    this.entities.rows = [...this._rows];

    this.entities.rows.map((row: any) => {
      this.keys.map((key: string) => {
        if(typeof row[key] === 'string' && row[key]?.toUpperCase()?.includes(s?.toUpperCase())) {
          newRows.push(row)
        }
      })
    }).filter((row: any) => row != undefined)

    this.entities.rows = [...new Set(newRows)]

    this.checkboxes.map((cb: any) => {
      cb.visible = false;
      this.entities.rows.map((r: any) => {
        if(r.id == cb.id) {
          cb.visible = true
        }
      })
    })

    let currentCB: any[] = [...this.checkboxes]
    currentCB = currentCB.map((cb: any) => {
      if(cb.visible) {
        return cb
      }
    }).filter((cb: any) => cb != undefined)

    this.update.emit(currentCB)
  }

  public showFilter() {
    const e = document.getElementById('dropdownRadio')!
    e.classList.toggle('hidden')
  }

  public getVal(val: any) {
    return val instanceof Object ? val.name : val
  }

  public updateDialog(id: number, entities: any, operation: string) {
    this.update.emit({id, entities, operation})
  }

  public changeValue(i: any) {
    this.checkboxes[i].checked = !this.checkboxes[i].checked
    this.update.emit(this.checkboxes)
  }

  public selectAll() {
    this.sAvalue = !this.sAvalue
    this.checkboxes.map((i: any) => {
      i.checked = this.sAvalue
    })

    this.update.emit(this.checkboxes)
  }

}
