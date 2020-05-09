import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DismissAlertComponent } from './alert/alert.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [SidenavComponent, DismissAlertComponent],
  exports: [SidenavComponent, DismissAlertComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class WidgetsModule { }
