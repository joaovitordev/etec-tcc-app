import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { PropertyService } from '../services/property.service';
import {Location} from '@angular/common';

// Declaração da variável global 
declare var google: any;

@Component({
  selector: 'app-propertyDetails',
  templateUrl: './propertyDetails.page.html',
  styleUrls: ['./propertyDetails.page.scss'],
})
export class PropertyDetailsPage implements OnInit {

  @ViewChild('map', { static: false }) mapElement: ElementRef;

  latitude: number;
  longitude: number;
  latArray: number;
  lonArray: number;
  map: any;

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private _location: Location
  ) { 
    this.id = this.route.snapshot.paramMap.get('id_property');
  }

  id: any;
  propertys: any;
  propertyTitle: string;
  propertyUrl: any;
  propertyImages: any;
  propertyNeighborhood: any;
  propertyCity: any;
  propertyContract: any;
  propertyBedroom: any;
  propertyRoom: any;
  propertyKitchen: any;
  propertyBathroom: any;
  propertyGarage: any;
  propertyChildren: any;
  propertyPets: any;
  propertyIndividual: any;
  propertyWater: any;
  propertyEnergy: any;
  propertyDeposit: any;
  propertyMonthlyPayment: any;
  propertyLat: any;
  propertyLon: any;
  ownerName: any;
  ownerEmail: any;
  ownerTelephone: any;
  ownerWhatsApp: any;



  ngOnInit() {
    this.getPropertys();
    this.loadMap();
  }

  backPage() {
    this._location.back();
  }

  loadMap(){
    this.geolocation.getCurrentPosition()
    .then(() => {
      this.propertyLat;
      this.propertyLon;

      const latLgn = new google.maps.LatLng(this.propertyLat, this.propertyLon);

      const mapOptions = {
        center: latLgn,
        zoom: 16,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      const icon = {
        url: 'assets/icon/iconImovel.png',
        scaledSize: new google.maps.Size(45, 45), // scaled size
        origin: new google.maps.Point(0,0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
      }

      new google.maps.Marker({
        position: new google.maps.LatLng(this.propertyLat, this.propertyLon),
        id: this.id,
        map: this.map,
        animation: google.maps.Animation.DROP,
        icon: icon
      });

    }).catch(error => {
      alert(error);
    });
  }
  getPropertys() {
    this.propertyService.get().subscribe((data) => {
      this.propertys = data;
      this.getPropertyById(this.propertys, this.id);
    });
  }

  getPropertyById(propertys, id){

    const propertyFilter = propertys.filter((data) => {
      return data.id_property == id;
    });

    console.log(propertyFilter);

    this.propertyTitle = propertyFilter[0].title;
    this.propertyUrl = propertyFilter[0].url;
    this.propertyImages = propertyFilter[0];
    this.propertyNeighborhood = propertyFilter[0].neighborhood;
    this.propertyBedroom = propertyFilter[0].bedroom;
    this.propertyRoom = propertyFilter[0].room;
    this.propertyKitchen = propertyFilter[0].kitchen;
    this.propertyBathroom = propertyFilter[0].bathroom;
    this.propertyGarage = propertyFilter[0].garage;
    this.propertyContract = propertyFilter[0].property_contract == 1 ? 'A casa tem contrato' : 'Não tem contrato';
    this.propertyChildren = propertyFilter[0].children  == 1 ? 'É permitido crianças' : 'Não é permitido crianças';
    this.propertyPets = propertyFilter[0].pets == 1 ? 'É permitido pets' : 'Não é permitido pets';
    this.propertyIndividual = propertyFilter[0].individual == 1 ? 'A casa é individual' : 'A casa não é individual';
    this.propertyWater = propertyFilter[0].water == 1 ? 'A água está inclusa na mensalidade' : 'A água não ésta inclusa na mensalidade';
    this.propertyEnergy = propertyFilter[0].energy == 1 ? 'A energia está inclusa na mensalidade' : 'A energia não ésta inclusa na mensalidade';
    this.propertyDeposit = propertyFilter[0].deposit;
    this.propertyMonthlyPayment = propertyFilter[0].monthly_payment;
    this.propertyLat = propertyFilter[0].lat;
    this.propertyLon = propertyFilter[0].lon;
    this.ownerName = propertyFilter[0].full_name;
    this.ownerEmail = propertyFilter[0].email;
    this.ownerTelephone = propertyFilter[0].telephone;
    this.propertyCity = propertyFilter[0].city;
    this.ownerWhatsApp = propertyFilter[0].whatsapp;
  }

  goToWhatsApp() {
    window.location.href = `https://api.whatsapp.com/send?phone=55${this.ownerWhatsApp}&text=Ol%C3%A1%2C%20encontrei%20voc%C3%AA%20no%20i-luguel%20e%20gostaria%20de%20saber%20mais%20sobre%20seu%20im%C3%B3vel.`;
  }
}