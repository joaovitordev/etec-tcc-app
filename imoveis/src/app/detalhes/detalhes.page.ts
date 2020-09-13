import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
})
export class DetalhesPage implements OnInit {

  id: any;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
   this.id = this.route.snapshot.paramMap.get('id');
  }

}
