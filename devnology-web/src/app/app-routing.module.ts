import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ComprasListComponent} from './components/compras-list/compras-list.component';
import { VendidosListComponent } from "./components/vendidos-list/vendidos-list.component";

import { VendaFormComponent } from './components/venda-form/venda-form.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: '/disponiveis',
    pathMatch: 'full'
  },
  {
    path: 'disponiveis',
    component: ComprasListComponent
  },
  {
    path: 'vendidos',
    component: VendidosListComponent

  },
  {
    path: 'vender/regis/:id',
    component: VendaFormComponent
  },
  {
    path: 'relatoriomes',
    component: VendaFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
