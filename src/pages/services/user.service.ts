import {Injectable} from "@angular/core";
import { Http } from '@angular/http';
import { Headers } from '@angular/http';

@Injectable()
export class UserService {
    private URL = "http://phplaravel-243080-747819.cloudwaysapps.com/api/";
    private headers = new Headers();

    constructor(private http:Http) {}

    public login(user){

      this.headers = new Headers();
      this.headers.append("Access-Control-Allow-Origin", "*");
      this.headers.append("Content-Type", "application/json; charset=UTF-8");

      console.log(this.headers);

      //this.headers.set("Content-Type", "application/json; charset=UTF-8");
      console.log(this.headers);

      return this.http.post(this.URL + 'Login', user, {headers: this.headers});
    }

    public register(user){
      this.headers = new Headers();
      this.headers.append("Access-Control-Allow-Origin", "*");
      this.headers.append("Content-Type", "application/json; charset=UTF-8");


      return this.http.post(this.URL + 'Register', user, {headers: this.headers});
    }

    public getAllPrizes(){
      this.headers = new Headers();
      this.headers.append("Access-Control-Allow-Origin", "*");
      this.headers.append("Content-Type", "application/json; charset=UTF-8");

      this.headers.append("Authorization", "Bearer "+localStorage.getItem("key"));
      return this.http.get(this.URL + 'getAllPrizes', {headers: this.headers});
    }

    public givePrize(prize){
      this.headers = new Headers();
      this.headers.append("Access-Control-Allow-Origin", "*");
      this.headers.append("Content-Type", "application/json; charset=UTF-8");

      this.headers.append("Authorization", "Bearer "+localStorage.getItem("key"));
      return this.http.post(this.URL + 'givePrize', prize,{headers: this.headers});
    }

    public getUserDetails(){
      this.headers = new Headers();
      this.headers.append("Access-Control-Allow-Origin", "*");
      this.headers.append("Content-Type", "application/json; charset=UTF-8");

      this.headers.append("Authorization", "Bearer "+localStorage.getItem("key"));
      return this.http.get(this.URL + 'getUserDetails', {headers: this.headers});
    }

    public addCords(cords){
      this.headers = new Headers();
      this.headers.append("Access-Control-Allow-Origin", "*");
      this.headers.append("Content-Type", "application/json; charset=UTF-8");

      this.headers.append("Authorization", "Bearer "+localStorage.getItem("key"));
      return this.http.post(this.URL + 'userCrods', cords, {headers: this.headers});
    }

    public updatesUser(data){
      this.headers = new Headers();
      this.headers.append("Access-Control-Allow-Origin", "*");
      this.headers.append("Content-Type", "application/json; charset=UTF-8");

      this.headers.append("Authorization", "Bearer "+localStorage.getItem("key"));
      console.log("Bodyyyyy", data);

      return this.http.post(this.URL + 'updateUser', data, {headers: this.headers});
    }

    public logout(){
      this.headers = new Headers();
      this.headers.append("Access-Control-Allow-Origin", "*");
      this.headers.append("Content-Type", "application/json; charset=UTF-8");

      this.headers.append("Authorization", "Bearer "+localStorage.getItem("key"));
      return this.http.post(this.URL + 'logout', null, {headers: this.headers});
    }
}
