import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensesTableComponent } from './components/expenses-table/expenses-table.component';
import { IncomesTableComponent } from './components/incomes-table/incomes-table.component'
import { HttpClientModule } from '@angular/common/http';
import { CategoriesTableComponent } from './components/categories-table/categories-table.component';
import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';
import { ComponentsModule } from 'src/components/components.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';



@NgModule({
  declarations: [
    ExpensesTableComponent,
    IncomesTableComponent,
    CategoriesTableComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModuleModule,
    ComponentsModule
  ],
  exports: [
    ExpensesTableComponent,
    IncomesTableComponent,
    CategoriesTableComponent,
    DashboardComponent
  ]
})
export class ModulesModule { }
