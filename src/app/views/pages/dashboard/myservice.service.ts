import {Injectable} from "@angular/core";

@Injectable()
export class myservice {
    flag: number = 1;
    role:string;
    userid:string
    touch(){
      this.flag=2;
    }

  gettheflag(){
   return this.flag;
  }

}
