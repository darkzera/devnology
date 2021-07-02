import { Component, OnInit, HostBinding } from '@angular/core';
import { GestaoService
 } from '../../services/gestao.service';
@Component({
  templateUrl: './compras-list.component.html',
  styleUrls: ['./compras-list.component.css']
})
export class ComprasListComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  veiculosDisponiveis: any = [];
  constructor(private gestao: GestaoService) {  }

  ngOnInit() {
    this.getMembroEsquadrao();
  }
  getMembroEsquadrao() {
    this.gestao.getVeiculosDisponiveis().subscribe(
      res => {
        this.veiculosDisponiveis= res;
      },
      err => console.error(err)
    );
  }







}
