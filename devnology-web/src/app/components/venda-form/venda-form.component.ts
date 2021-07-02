import { GestaoService
 } from '../../services/gestao.service';
import { Compra } from '../../models/interf';
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


  edit = false;

  constructor(private gestao: GestaoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
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
    console.log(this.compraPraVenda);

  //   this.gestao.saveMembroEsquadrao(this.)
  //     .subscribe(
  //       res => {
  //         console.log(res);
  //         this.router.navigate(['/p']);
  //       },
  //       err => console.error(err)
  //     );
  }
}
