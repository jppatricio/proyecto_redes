import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio/inicio.component';
import { SumerizacionComponent } from './sumerizacion/sumerizacion.component';
import { SubneteoComponent } from './subneteo/subneteo.component';



@NgModule({
  declarations: [InicioComponent, SumerizacionComponent, SubneteoComponent],
  exports: [InicioComponent, SumerizacionComponent, SubneteoComponent],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
