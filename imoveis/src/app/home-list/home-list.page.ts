import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { PropertysService } from '../services/propertys.service';
@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.page.html',
  styleUrls: ['./home-list.page.scss'],
})
export class HomeListPage implements OnInit {

  constructor(
    private propertyService: PropertysService,
    private router: Router
  ) { }

  propertys: any;

  ngOnInit() {
    this.getPropertys();
  }

  getPropertys() {
    this.propertyService.get().subscribe((data) => {
      this.propertys = data;
    })
  }

  houseInMaps(){
    this.router.navigateByUrl('/home');
  }
}
