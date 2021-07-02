import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { member } from '../models/interf';
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

  cadastraVenda(venda: { idCarro: number; idFuncionario: number; }) {
    return this.http
    .post(`${this.API_URI}venda/createnota`, venda);

  }

  getCompra(id: string) {
    return this.http
      .get(`${this.API_URI}compra/${id}`);
  }

  // 
  getVeiculo(id: string) {
    return this.http
      .get(`${this.API_URI}carro/${id}`);
  }

  getFuncionarios(){
    return this.http
      .get(`${this.API_URI}funcionario/`);
  }


  // veiculos disponívels -> Comprados com boolean true
  getVeiculosDisponiveis(){
    return this.http
      .get(`${this.API_URI}carro/veiculosdisponiveis`);
  }

  // faz registro da compra (new compra + new carro)
  savemember(membro: member) {
    return this.http
      .post(`${this.API_URI}/member`, membro);
  }


  updatemember(updatemember: member): Observable<member> | any {
    // return this.http
    //   .put(`${this.API_URI}/member/${updatemember.cod_venda},
    // ${updatemember.cod_esquadrao}`, updatemember);
  }

}
