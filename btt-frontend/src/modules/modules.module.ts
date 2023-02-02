import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntitiesModule } from './entities/entities.module';
import { ExpensesTableComponent } from './components/expenses-table/expenses-table.component';
import { IncomesTableComponent } from './components/incomes-table/incomes-table.component'
import { HttpClientModule } from '@angular/common/http';
import { CategoriesSetupComponent } from './components/categories-setup/categories-setup.component';
import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';
import { ComponentsModule } from 'src/components/components.module';



@NgModule({
  declarations: [
    ExpensesTableComponent,
    IncomesTableComponent,
    CategoriesSetupComponent
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
    CategoriesSetupComponent
  ]
})
export class ModulesModule { }
