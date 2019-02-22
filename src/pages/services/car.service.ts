import {Injectable} from "@angular/core";
import { Http } from '@angular/http';
import { Headers } from '@angular/http';

@Injectable()
export class CarService {

  private URL = "http://phplaravel-243080-747819.cloudwaysapps.com/api/";
  private headers = new Headers();

  constructor(private http:Http) {}

  public createCar(car){

    this.headers = new Headers();
    this.headers.append("Access-Control-Allow-Origin", "*");
    this.headers.append("Content-Type", "application/json; charset=UTF-8");

    this.headers.append("Authorization", "Bearer "+localStorage.getItem("key"));



    return this.http.post(this.URL + 'createCar', car, {headers: this.headers});
  }

}
