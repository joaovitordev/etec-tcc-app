import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  itens: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {

    this.itens = [
      {
        id : 1 ,
        src : '../assets/imovel/#' ,
        titulo : 'Casa Teste' ,
        descricao : 'É UMA CASA'
      },
      {
        id : 2 ,
        src : '../assets/imovel/#' ,
        titulo : 'Apartamento Teste' ,
        descricao : 'É UM APARTAMENTO'
      },
      {
        id : 2 ,
        src : '../assets/imovel/#' ,
        titulo : 'Sitio Teste' ,
        descricao : 'É UM SITIO'
      }
    ];

  }

  detalhes(){
    this.router.navigateByUrl('/property-details' + this.itens.id);
  }
}
