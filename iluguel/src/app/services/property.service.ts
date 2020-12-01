import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(){

  }
  
  get(): any {
    return this.http.get('https://youlikedigital.com.br/iluguel/api/get-propertys.php');
  }
}
