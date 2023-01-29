import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntitiesModule } from './entities/entities.module';
import { ExpensesTableComponent } from './components/expenses-table/expenses-table.component';
import { IncomesTableComponent } from './components/incomes-table/incomes-table.component'
import { HttpClientModule } from '@angular/common/http';
import { CategoriesSetupComponent } from './components/categories-setup/categories-setup.component'



@NgModule({
  declarations: [
    ExpensesTableComponent,
    IncomesTableComponent,
    CategoriesSetupComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    ExpensesTableComponent,
    IncomesTableComponent,
    CategoriesSetupComponent
  ]
})
export class ModulesModule { }
