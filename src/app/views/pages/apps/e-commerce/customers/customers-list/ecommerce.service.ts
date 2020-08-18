import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Cookie} from "ng2-cookies";

@Injectable()
export class EcommerceService{

  constructor(private http:HttpClient) {
  }

  public getRequest(path){
    var headers = new HttpHeaders({
      'Authorization': 'Bearer '+Cookie.get('access_token')});
    this.http.get(path,{ headers: headers })
      .subscribe(
        data=>{
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
  }

}

