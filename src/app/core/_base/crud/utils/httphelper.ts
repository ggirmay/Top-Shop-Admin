import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable()
export class HttpHelper{
  http:HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }


  public getRequest(path) {

    this.http.get(path)
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
  }

  public postRequest(path) {

    this.http.post(path,null)
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
  }

  public deleteRequest(path){

    this.http.delete(path)
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );

  }
}
