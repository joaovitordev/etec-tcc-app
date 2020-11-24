import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { Router} from '@angular/router';
=======
import { Router } from '@angular/router';
>>>>>>> 02b512867a2e3540fb8cf166def7ee04103b9871
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
<<<<<<< HEAD
  ) { }
=======
    ) { }
>>>>>>> 02b512867a2e3540fb8cf166def7ee04103b9871

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
