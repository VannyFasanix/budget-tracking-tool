import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TableComponent } from './table/table.component';
import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';
import { DialogComponent } from './dialog/dialog.component';


@NgModule({
  declarations: [
    SidebarComponent,
    TableComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule
  ],
  exports: [
    SidebarComponent,
    TableComponent,
    DialogComponent
  ]
})
export class ComponentsModule { }
