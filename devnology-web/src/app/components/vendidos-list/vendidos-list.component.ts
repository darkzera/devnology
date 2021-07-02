import { Component, OnInit, HostBinding } from '@angular/core';
import { GestaoService
 } from '../../services/gestao.service';

@Component({
  selector: 'app--list',
  templateUrl: './vendidos-list.component.html',
  styleUrls: ['./vendidos-list.component.css']
})
export class VendidosListComponent implements OnInit {

  listAllVendas: any = [];
  constructor(private rt: GestaoService) { }

  @HostBinding('class') classes = 'row';

  ngOnInit() {
    this.getAll();
  }

  getAll() {
      this.rt.getAllVendas().subscribe(
      res => {
        this.listAllVendas= res;
      },
      err => console.error(err)
    );
  }



}
