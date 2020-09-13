import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  itens: any;

  constructor(
    private router: Router
  ) {}

  ngOnInit(){
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
    this.router.navigateByUrl('/detalhes' + this.itens.id);
  }
}
