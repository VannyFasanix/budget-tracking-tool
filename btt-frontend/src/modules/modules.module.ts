import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntitiesModule } from './entities/entities.module';
import { ExpensesTableComponent } from './components/expenses-table/expenses-table.component';
import { IncomesTableComponent } from './components/incomes-table/incomes-table.component'
import { HttpClientModule } from '@angular/common/http'



@NgModule({
  declarations: [
    ExpensesTableComponent,
    IncomesTableComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    ExpensesTableComponent,
    IncomesTableComponent
  ]
})
export class ModulesModule { }
