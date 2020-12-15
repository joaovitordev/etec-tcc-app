import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { PropertyService } from '../services/property.service';

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
  responseAddress = new Array();
  
  infoWindows: any = [];

  id: any;
  propertys: any;
  // distance: any;

  
  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder, // não usado até o momento.
    private router: Router,
    private propertyService: PropertyService
  ) { }

  ngOnInit() {
    this.loadMap();
    this.getPropertys();
  }

  //Faz a criação do mapa que aparece na tela para o usuario pegando como base a localização atual do aparelho.
  loadMap() {
    this.geolocation.getCurrentPosition()
    .then(resp => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;

      const latLgn = new google.maps.LatLng(this.latitude, this.longitude);

      const mapOptions = {
        center: latLgn,
        zoom: 13,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      const iconUser = {
        url: 'assets/icon/iconUser.png',
        scaledSize: new google.maps.Size(30, 30), // scaled size
        origin: new google.maps.Point(0,0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
      }
      
      // bloco de teste para saber onde você se encontra
      // Metodo adiciona um pin point no google maps
      new google.maps.Marker({
        position: new google.maps.LatLng(this.latitude, this.longitude),
        title: 'User',
        map: this.map,
        animation: google.maps.Animation.DROP,
        icon: iconUser // pin customizado
      });
      
      this.addMarker(this.propertys);

    }).catch(error => {
      alert(error);
    });
  } 
  
  // Metodo que faz a implementação dos imovies disponíveis e cria um pin marker em sua localização no mapa.
  addMarker(propertys){

    const iconImovel = {
      url: 'assets/icon/iconImovel.png',
      scaledSize: new google.maps.Size(30, 30), // scaled size
      origin: new google.maps.Point(0,0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
    }
    
    for(let property of propertys){
      let mapMarker = new google.maps.Marker({
      position: new google.maps.LatLng(property.lat, property.lon),
      title: property.title,
      neighborhood: property.neighborhood,
      price: property.monthly_payment,
      id: property.id_property,
      distance: property.distance,
      animation: google.maps.Animation.DROP,
      map: this.map,
      icon: iconImovel  // pin customizado
      })
      this.addInfoWindow(mapMarker);
      // console.log(mapMarker);
    }
  } 
  // Metodo que cria um card para cada imovel cadastrado com informações simplificadas.
  addInfoWindow(mapMarker){
    const content = "<div>" +
                      "<h5>" + mapMarker.title + "</h5><br>" + 
                      "<p>" + mapMarker.neighborhood + "<br>" + 
                      " R$ " + mapMarker.price + " <br>" +
                      " " + mapMarker.distance + " Kms</p><br>" +  
                      "<ion-button id='details' slot='end'>Detalhes</ion-button>" + 
                    "</div>";
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    /* Adiciona um listener para, primeiro, executar o metodo que fecha todos os cards,
       para assim abrir o card que foi selecionado. 
    */
    mapMarker.addListener('click', () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, mapMarker);
      /* Adiciona um evento que, ao ter o botão de 'detalhes' clicado, 
         irá redirecional para a pagina com mais detalhas sobre aquele imovel. 
      */
      google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
        document.getElementById('details').addEventListener('click', () => {
          this.router.navigateByUrl('/property-details/' + mapMarker.id)
        })
      })
    });

    this.infoWindows.push(infoWindow);
    
  }
  // Metodo que fecha todos os cards dos imoveis. 
  closeAllInfoWindows(){
    for(let window of this.infoWindows){
      window.close(); 
    }
  }
  // Metodo que chama o serviço que traz a API com os dados os imoveis.
  getPropertys() {
    this.propertyService.get().subscribe((data) => {
      this.propertys = data;
    });
  }
  // Metodo que faz a navegação para a tela de lista onde todos so imoveis vão estar listados.
  houseInLists(){
    this.router.navigateByUrl('/homeList');
  }
}
