import {Injectable} from "@angular/core";
import { Http } from '@angular/http';
import { Headers } from '@angular/http';

@Injectable()
export class TripService {

  private URL = "http://phplaravel-243080-747819.cloudwaysapps.com/api/";
  public headers = new Headers();

  constructor(private http:Http) {}

  public createTrip(trip){

    this.headers = new Headers();
    this.headers.append("Access-Control-Allow-Origin", "*");
    this.headers.append("Content-Type", "application/json; charset=UTF-8");

    this.headers.append("Authorization", "Bearer "+localStorage.getItem("key"));



    return this.http.post(this.URL + 'createTrip', trip, {headers: this.headers});
  }

  public getAllTrips(driver_id){
    this.headers = new Headers();
    this.headers.append("Access-Control-Allow-Origin", "*");
    this.headers.append("Content-Type", "application/json; charset=UTF-8");

    this.headers.append("Authorization", "Bearer "+localStorage.getItem("key"));

    return this.http.get(this.URL +'getPassengerTrips', {headers: this.headers});
  }

  public getDriverTrips(driver_id){
    this.headers = new Headers();
    this.headers.append("Access-Control-Allow-Origin", "*");
    this.headers.append("Content-Type", "application/json; charset=UTF-8");

    this.headers.append("Authorization", "Bearer "+localStorage.getItem("key"));

    return this.http.get(this.URL +'getDriverTrips', {headers: this.headers});
  }

  public findTrips(trip_data){
    this.headers = new Headers();
    this.headers.append("Access-Control-Allow-Origin", "*");
    this.headers.append("Content-Type", "application/json; charset=UTF-8");

    this.headers.append("Authorization", "Bearer "+localStorage.getItem("key"));

    return this.http.post(this.URL + 'findTrips', trip_data , {headers: this.headers});
  }

  public getTripDetails(trip_id){
    this.headers = new Headers();
    this.headers.append("Access-Control-Allow-Origin", "*");
    this.headers.append("Content-Type", "application/json; charset=UTF-8");

    this.headers.append("Authorization", "Bearer "+localStorage.getItem("key"));

    return this.http.get(this.URL + 'getTripDetails/' + trip_id,  {headers: this.headers});
  }

  public joinTrip(trip_id){
    this.headers = new Headers();
    this.headers.append("Access-Control-Allow-Origin", "*");
    this.headers.append("Content-Type", "application/json; charset=UTF-8");

    this.headers.append("Authorization", "Bearer "+localStorage.getItem("key"));

    return this.http.post(this.URL + 'joinTrip' , {'trip_id' : trip_id},  {headers: this.headers});
  }

  public deleteTrip(trip_id){
    this.headers = new Headers();
    this.headers.append("Access-Control-Allow-Origin", "*");
    this.headers.append("Content-Type", "application/json; charset=UTF-8");

    this.headers.append("Authorization", "Bearer "+localStorage.getItem("key"));

    return this.http.post(this.URL + 'deleteTrip/' + trip_id, null,  {headers: this.headers});
  }

  public checkStartUser(trip_id, lat, lang){
    this.headers = new Headers();
    this.headers.append("Access-Control-Allow-Origin", "*");
    this.headers.append("Content-Type", "application/json; charset=UTF-8");

    this.headers.append("Authorization", "Bearer "+localStorage.getItem("key"));

    return this.http.post(this.URL + 'checkStartUser',
                          {"trip_id": trip_id , "start_lat": lat, "start_lang": lang} ,
                           {headers: this.headers});
  }

  public checkEndUser(trip_id, lat, lang){
    this.headers = new Headers();
    this.headers.append("Access-Control-Allow-Origin", "*");
    this.headers.append("Content-Type", "application/json; charset=UTF-8");

    this.headers.append("Authorization", "Bearer "+localStorage.getItem("key"));

    return this.http.post(this.URL + 'checkEndUser',
                          {"trip_id": trip_id , "end_lat": lat, "end_lang": lang} ,
                           {headers: this.headers});
  }

  public checkStartDriver(trip_id){
    this.headers = new Headers();
    this.headers.append("Access-Control-Allow-Origin", "*");
    this.headers.append("Content-Type", "application/json; charset=UTF-8");

    this.headers.append("Authorization", "Bearer "+localStorage.getItem("key"));

    return this.http.get(this.URL + 'checkStartDriver/' + trip_id,  {headers: this.headers});
  }

  public checkEndDriver(trip_id){
    this.headers = new Headers();
    this.headers.append("Access-Control-Allow-Origin", "*");
    this.headers.append("Content-Type", "application/json; charset=UTF-8");

    this.headers.append("Authorization", "Bearer "+localStorage.getItem("key"));

    return this.http.get(this.URL + 'checkEndDriver/' + trip_id,  {headers: this.headers});
  }

  public setPassengersArrived(users_arrived){

    this.headers = new Headers();
    this.headers.append("Access-Control-Allow-Origin", "*");
    this.headers.append("Content-Type", "application/json; charset=UTF-8");

    this.headers.append("Authorization", "Bearer "+localStorage.getItem("key"));

    return this.http.post(this.URL + 'setPassesArrived/' , users_arrived,  {headers: this.headers});
  }

  public confirmJoinTrip(confirmed, user_trip){

    this.headers = new Headers();
    this.headers.append("Access-Control-Allow-Origin", "*");
    this.headers.append("Content-Type", "application/json; charset=UTF-8");

    this.headers.append("Authorization", "Bearer "+localStorage.getItem("key"));
    console.log("user_trip Bodddy", user_trip);

    return this.http.post(this.URL + 'confirmJoinTrip/'+ confirmed, user_trip,  {headers: this.headers});
  }

  public addPoints(trip_id, arrived_passes){
    console.log("Passes" , arrived_passes);

    this.headers = new Headers();
    this.headers.append("Access-Control-Allow-Origin", "*");
    this.headers.append("Content-Type", "application/json; charset=UTF-8");

    this.headers.append("Authorization", "Bearer "+localStorage.getItem("key"));

    return this.http.post(this.URL + 'addPoints/'+ trip_id, {"arrived_passes":arrived_passes},  {headers: this.headers});
  }

}
