import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';

// Declaração da variável global 
declare var google: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild('map', { static: false }) mapElement: ElementRef;

  latitude: any;
  longitude: any;

  map: any;

  address: string;

  responseAddress = new Array();


  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    this.geolocation.getCurrentPosition()
      .then(resp => {
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;

        const latLgn = new google.maps.LatLng(this.latitude, this.longitude);

        let mapOptions = {
          center: latLgn,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

        this.map.addListener('dragend', () => {
          this.latitude = this.map.center.lat();
          this.longitude = this.map.center.lng();
        })

        // Adiciona um pin point no google maps
        new google.maps.marker({
          position: new google.maps.LatLng(this.latitude, this.longitude),
          title: 'Pin Point',
          map: this.map,
          // icon: 'assets/icon/iluguel-icon.png' // pin customizado
        });

        // método que traz o endereço
        this.getAddressFromCoords(this.latitude, this.longitude);

      }).catch(error => {
        alert(error);
      });
  }
  // método que traz o endereço
  getAddressFromCoords(latitude: number, longitude: number) {

    const options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    this.nativeGeocoder.reverseGeocode(latitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        this.address = '';
        // tslint:disable-next-line: prefer-const
        let responseAddress = [];
        for (const [key, value] of Object.entries(result[0])) {
          if (value.length > 0) {
            responseAddress.push(value);
          }
        }
        responseAddress.reverse();

        this.address = responseAddress[2] + ', ' +
          responseAddress[1] + ' - ' +
          responseAddress[3] + ' ' +
          responseAddress[4] + ' ' +
          responseAddress[5] + ' ' +
          responseAddress[6] + ' ' +
          responseAddress[7] + ' ' +
          responseAddress[8] + ' ' +
          responseAddress[9];
      })
      .catch((error: any) => {
        this.address = 'Endereço não disponivel!';
      });
  }

  details(){
    this.router.navigateByUrl('/property-details');
  }

  houseInLists(){
    this.router.navigateByUrl('/home-list');
  }
}
