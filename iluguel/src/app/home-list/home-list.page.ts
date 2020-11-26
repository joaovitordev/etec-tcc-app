import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { PropertyService } from '../services/property.service';
@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.page.html',
  styleUrls: ['./home-list.page.scss'],
})
export class HomeListPage implements OnInit {

  constructor(
    private propertyService: PropertyService,
    private router: Router
  ) { }

  propertys: any;


  ngOnInit() {
    this.getPropertys();
  }

  getPropertys() {
    this.propertyService.get().subscribe((data) => {
      this.propertys = data;
    });
  }

  propertyDetails(id: any){

    this.router.navigateByUrl('/property-details/' + id);
  }

  houseInMaps(){
    this.router.navigateByUrl('/home');
  }
}
