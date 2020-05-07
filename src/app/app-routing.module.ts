import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { SubneteoComponent } from './pages/subneteo/subneteo.component';
import { SumerizacionComponent } from './pages/sumerizacion/sumerizacion.component';


const routes: Routes = [

  { path: 'inicio',             component: InicioComponent },
  { path: 'subneteo',             component: SubneteoComponent },
  { path: 'sumerizacion',             component: SumerizacionComponent },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: '**', redirectTo: 'inicio'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
