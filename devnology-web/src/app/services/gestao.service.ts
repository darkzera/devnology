import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MembroEsquadrao } from '../models/interf';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

// VendaService
export class GestaoService
 {
  API_URI = environment.api_uri;

  constructor(private http: HttpClient) { }

  // get All vendas feitas 
  getAllVendas() {
    return this.http
      .get(`${this.API_URI}venda`);
  }

  // esse aqui vai buscar uma COMPRA <- pra realizar a venda
  getCompra(id: string) {
    return this.http
      .get(`${this.API_URI}compra/${id}`);
  }
  // esse aqui vai buscar uma COMPRA <- pra realizar a venda
  getVeiculo(id: string) {
    return this.http
      .get(`${this.API_URI}carro/${id}`);
  }

  getVeiculosDisponiveis(){
    return this.http
      .get(`${this.API_URI}carro/veiculosdisponiveis`);
  }

  // faz registro da compra (new compra + new carro)
  saveMembroEsquadrao(membro: MembroEsquadrao) {
    return this.http
      .post(`${this.API_URI}/MembroEsquadrao`, membro);
  }


  updateMembroEsquadrao(updateMembroEsquadrao: MembroEsquadrao): Observable<MembroEsquadrao> | any {
    // return this.http
    //   .put(`${this.API_URI}/MembroEsquadrao/${updateMembroEsquadrao.cod_venda},
    // ${updateMembroEsquadrao.cod_esquadrao}`, updateMembroEsquadrao);
  }

}
