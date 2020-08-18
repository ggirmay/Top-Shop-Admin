import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  ChangeDetectionStrategy,
  OnDestroy,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoadingBarService} from "@ngx-loading-bar/core";
import {HttpHelper} from "../../../../../../core/_base/crud/utils/httphelper";

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'kt-products-list',
	templateUrl: './products-list.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsListComponent implements OnInit {


  constructor(public loader: LoadingBarService,private http:HttpHelper,private httpClient:HttpClient) {
    this.title ='pending';
    this.getAllProduct('pending');
  }

  products = [];
  load: boolean = true;
  title:string;

  ngOnInit(): void {
    this.title ='pending';
  }

getAllProduct(path){
if(path=="pending"){
  this.title = "Pending Products"
}
  if(path=="getAll"){
    this.title = "All Products"
  }
  if(path=="deleted"){
    this.title = "deleted Products"
  }
  if(path=="rejected"){
    this.title = "rejected Products"
  }
  this.load = true;
  return this.httpClient.get("http://localhost:8080/product-service/product/"+path)
    .subscribe(
      (data: any) => {
        this.products = data;
      },
      error => {
        console.log(error);
      }
    );


}

  disapprove(id) {
    this.http.getRequest("http://localhost:8080/product-service/product/reject/"+id);
  }

  removeDocument(id){
    this.products.forEach( (item, index) => {
      if(item.id === id) this.products.splice(index,1);
    });
  }
  approve(id){
    this.http.getRequest("http://localhost:8080/product-service/product/approve/"+id);
    this.removeDocument(id);
  }

  delete(id){
    this.http.deleteRequest("http://localhost:8080/product-service/product/delete/"+id);

    this.removeDocument(id);
  }




  displayAllProducts() {

  }



}
