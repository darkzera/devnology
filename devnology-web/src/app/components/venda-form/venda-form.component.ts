import { GestaoService } from '../../services/gestao.service';
import { Compra, Funcionario } from '../../models/interf';
import { Component, OnInit, HostBinding } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-venda-form',
  templateUrl: './venda-form.component.html',
  styleUrls: ['./venda-form.component.css']
})
export class VendaFormComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  compraPraVenda: Compra = {
    idCompra: -1,
    valor_compra: 0,
    idCarro: -1,
    data_compra: "-"
  }
  t: any = [];

  edit = false;

  constructor(private gestao: GestaoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }




  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;

    this.gestao.getFuncionarios()
      .subscribe(
        res => {
          this.t = res;
          console.log(res)
          console.log("t", this.t);
          this.edit = true;
        },
        err => console.error(err)
      );
    console.log(typeof (this.t));

    // Parametro da compra -> parm.id
    if (params.id) {
      this.gestao.getCompra(params.id)
        .subscribe(
          res => {
            this.compraPraVenda = res;
            this.edit = true;
          },
          err => console.error(err)
        );
    }
  }

  saveNewVenda() {
    delete this.compraPraVenda.idCompra;
    // montar ob pra preparar a venda -> consultar na api os req.
    // Escolher o vendendor butt
    // Implementar desconto na API e disponibilizar o input no form
    const venda = {
      idCarro: this.compraPraVenda.idCarro,
      idFuncionario: this.t[0].id,
    }
    this.gestao.cadastraVenda(venda)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/disponiveis']);
        },
        err => console.error(err)
      );

  }
}
