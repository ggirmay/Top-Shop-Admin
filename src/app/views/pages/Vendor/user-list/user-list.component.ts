
import { Component, OnInit } from "@angular/core";

import { Router, ActivatedRoute } from "@angular/router";
import { Vendor } from "src/app/vendor";
import {UserService} from "../user-service.service";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"],
})
export class UserListComponent implements OnInit {
  vendor: Vendor;
  users: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.vendor = new Vendor();
  }

  ngOnInit() {
    // this.userService.findAll().subscribe(data => {
    //   this.users = data;
    // });
  }

  onReject() {
    this.userService.remove(this.vendor);
    this.gotoUserList();
  }

  onApprove() {
    this.userService
      .save(this.vendor)
      .subscribe((result) => this.gotoUserList());
  }

  gotoUserList() {
    this.router.navigate(["/validation"]);
  }
}
