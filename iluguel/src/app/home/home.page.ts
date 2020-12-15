import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { PropertyService } from '../services/property.service';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

// Declaração da variável global 
declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild('map', { static: false }) mapElement: ElementRef;
  
  latitude: any; // Armazena a latitude do usuário.
  longitude: any; // Armazena a longitude do usuário.
  map: any; // Variável criada para executar o mapa que vem da API da Google.
  infoWindows: any = []; // Armazena em forma de Array as informações que vão montar o card.
  id: any; // Pega o Id de cada casa armazenada na API para utilizar nos pins e cards.
  propertys: any = []; // Variável que recebe os dados da API.

  
  constructor(
    private geolocation: Geolocation, // Plugin usado para pegar as coordenadas e usa-las no mapa.
    private locationAccuracy: LocationAccuracy, // Plugin que solicita permissão ao usuário. acces gps.
    private router: Router, // Plugin nativo que faz a navegação entre paginas.
    private propertyService: PropertyService // Service que trás os dados da nossa API.
  ) { }

  ngOnInit() {
    this.getPropertys(); // Executa o metodo que chama o serviço que trás os dados da API.
    this.loadMap(); // Executa o metodo de criação de mapa ao iniciar a página. 
  }
   
  // Metodo que chama o serviço que traz a API com os dados os imoveis.
  getPropertys() {
    this.propertyService.get().subscribe((data) => {
      this.propertys = data;
    });
  }

  // Metodo que faz a implementação dos imovies disponíveis e cria um pin marker em sua localização no mapa.
  addMarker(){

    let pin = this.propertys; // Recebe os dados da API para trata-los dentro do Loop.

    // Varivável que armazena as caracteristicas do pin marker customizado das casas cadastradas no banco.
    const iconImovel = {
      url: 'assets/icon/iconImovel.png', // Adciona uma imagem para substituir o icone padrão da Google.
      scaledSize: new google.maps.Size(30, 30), // Escala de tamanho.
      origin: new google.maps.Point(0,0), // Ponto de origem do pin marker.
      anchor: new google.maps.Point(0,0) // Ponto de ancoragem onde o pin marker estará.
    }

    // Loop que criará um pin para cada casa cadastrada em nossa API.
    for(let property of pin){
      let mapMarker = new google.maps.Marker({
      position: new google.maps.LatLng(property.lat, property.lon),
      title: property.title,
      neighborhood: property.neighborhood,
      price: property.monthly_payment,
      id: property.id_property,
      distance: property.distance,
      animation: google.maps.Animation.DROP,
      map: this.map,
      icon: iconImovel // Pin customizado
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
          this.router.navigateByUrl('/propertyDetails/' + mapMarker.id)
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
  //Faz a criação do mapa que aparece na tela para o usuario pegando como base a localização atual do aparelho.
  loadMap() {
    this.geolocation.getCurrentPosition()
    .then(resp => {
      // coleta e armazena as coordenadas atuais do usuário.
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;

      // Monta o mapá a partir das coordenadas coletadas do usuário.  
      const latLgn = new google.maps.LatLng(this.latitude, this.longitude);
      // Cria uma constante que irá fazer a configuração do mapa. 
      const mapOptions = {
        center: latLgn,
        zoom: 13,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      // Varivável que armazena as caracteristicas do pin marker customizado do usuário
      const iconUser = {
        url: 'assets/icon/iconUser.png',
        scaledSize: new google.maps.Size(30, 30), // scaled size
        origin: new google.maps.Point(0,0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
      }
      
      // Metodo adiciona um pin point no google maps.
      new google.maps.Marker({
        position: new google.maps.LatLng(this.latitude, this.longitude),
        title: 'User',
        map: this.map,
        animation: google.maps.Animation.DROP,
        icon: iconUser // pin customizado.
      });
      
      // Chamada do metodo que adiciona os pins no mapa.
      this.addMarker();

    }).catch(error => {
      alert(error);
    });
  } 
  // Metodo que faz a navegação para a tela de lista onde todos so imoveis vão estar listados.
  houseInLists(){
    this.router.navigateByUrl('/homeList');
  }
}
