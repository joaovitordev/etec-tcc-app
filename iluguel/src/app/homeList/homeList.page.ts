import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { PropertyService } from '../services/property.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-homeList',
  templateUrl: './homeList.page.html',
  styleUrls: ['./homeList.page.scss'],
})
export class HomeListPage implements OnInit {
  
  constructor(
    private propertyService: PropertyService,
    private router: Router,
    private geolocation: Geolocation
  ) { }

  propertys: any;
  distance: any;
  latitude: any;
  longitude: any;
  latArray: any = [];
  lonArray: any = [];
  sliderImages: any = [];


  ngOnInit() {
    this.getPropertys();
  }

  search() {
    const searchbar = document.querySelector('ion-searchbar');
    const items = this.propertys;

    searchbar.addEventListener('ionInput', handleInput);

    function handleInput(event) {
      const query = event.target.value.toLowerCase();
      requestAnimationFrame(() => {
        items.forEach(item => {
          const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
          item.style.display = shouldShow ? 'block' : 'none';
        });
      });
    }
  }
     

  getPropertys() {
    this.propertyService.get().subscribe((data) => {
      this.propertys = data;
      this.sliderImages;
      console.log(this.sliderImages);
      this.getGeolocation(this.propertys);
    });
  }
  getGeolocation(propertys){
    this.geolocation.getCurrentPosition()
      .then(resp => {
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;

        for(let property of propertys){
          let lat1 = this.latitude;
          let lon1 = this.longitude;
          this.latArray = Number.parseFloat(property.lat);
          this.lonArray = Number.parseFloat(property.lon);
          property.distance = this.getDistance(lat1, lon1, this.latArray, this.lonArray);
          // console.log(lat1, lon1, this.latArray, this.lonArray);
        }
      }).catch(error => {
        alert(error);
      });
  }

  getDistance(lat1, lon1, lat2, lon2) {

    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;
    let result = 12742 * Math.asin(Math.sqrt(a)); // 2 * R = 12742; (R = 6371 km)
    this.propertys.distance = result.toFixed(1);
    return this.propertys.distance;  
  }

  propertyDetails(id: any){
    this.router.navigateByUrl('/propertyDetails/' + id);
  }

  maps(){
    this.router.navigateByUrl('/home');
  }
}
