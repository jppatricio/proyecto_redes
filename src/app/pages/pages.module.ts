import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio/inicio.component';
import { SumerizacionComponent } from './sumerizacion/sumerizacion.component';
import { SubneteoComponent } from './subneteo/subneteo.component';
import { AlertModule } from '../_alert';
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [InicioComponent, SumerizacionComponent, SubneteoComponent],
  exports: [InicioComponent, SumerizacionComponent, SubneteoComponent],
  imports: [
    CommonModule, ReactiveFormsModule, AlertModule
  ]
})
export class PagesModule { }
