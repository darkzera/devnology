import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { ComprasListComponent } from './components/compras-list/compras-list.component';

import { VendaFormComponent } from './components/venda-form/venda-form.component';

import { VendidosListComponent } from "./components/vendidos-list/vendidos-list.component";
import { GestaoService } from './services/gestao.service';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SidebarComponent,
    ComprasListComponent,
    VendidosListComponent,
    VendaFormComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    GestaoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
