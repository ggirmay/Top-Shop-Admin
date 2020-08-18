import { AfterViewInit, AfterViewChecked } from '@angular/core';

import { Component, OnInit, ElementRef, ViewChild, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {LoadingBarService} from "@ngx-loading-bar/core";

@Component({
	selector: 'kt-users-list',
	templateUrl: './users-list.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent implements OnInit, OnDestroy {
  http: HttpClient;


  constructor(http: HttpClient, public loader: LoadingBarService,private router: Router) {
    this.http = http;
  }

  users: any[];
  load: boolean = true;
  customers: any;

  ngOnDestroy(): void {

  }

  ngOnInit(): void {
    this.navigateToUser();
  }

  // getAllUsers() {
  //   this.load = true;
  //   return this.http.get("http://localhost:8080/user-service/api/admin/pendingAdmin")
  //     .subscribe(
  //       (data: any) => {
  //         this.users = data;
  //       },
  //       error => {
  //         console.log(error);
  //       }
  //     );
  //
  //   this.load = false;
  // }
  //
  // disapprove(id) {
  //   this.http.get("http://localhost:8080/user-service/api/admin/reject/" + id)
  //     .subscribe(
  //       data => {
  //         console.log(data);
  //       },
  //       error => {
  //         console.log(error);
  //       }
  //     );
  //   this.removeDocument(id);
  // }
  //
  // removeDocument(id) {
  //   this.users.forEach((item, index) => {
  //     if (item.id === id) this.users.splice(index, 1);
  //   });
  // }
  //
  // approve(id) {
  //   this.http.get("http://localhost:8080/user-service/api/user/approve/" + id)
  //     .subscribe(
  //       data => {
  //         console.log(data);
  //       },
  //       error => {
  //         console.log(error);
  //       }
  //     );
  //   this.removeDocument(id);
  //
  //   // this.products
  // }
  //
  // delete(id) {
  //   this.http.delete("http://localhost:8080/user-service/api/user/" + id)
  //     .subscribe(
  //       data => {
  //         console.log(data);
  //       },
  //       error => {
  //         console.log(error);
  //       }
  //     );
  //   this.removeDocument(id);
  //
  // }
  //
  //
  // refresh() {
  // this.users = new Array();
  // this.getAllUsers();
  // }
  //
  // displayAllUsers() {
  //
  // }

  navigateToUser() {

    setInterval(() => {
      this.router.navigateByUrl('/ecommerce/products');
    }, 1000);

  }
}
