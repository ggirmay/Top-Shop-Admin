import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { User } from "src/app/user";
import { Cookie } from "ng2-cookies";
import {UserService} from "../../user-service.service";
import {UserAccount} from "../../../../../core/model/userAccount";
import {Employee} from "../../../../../core/model/employee";

@Component({
  selector: "app-vendor-management",
  templateUrl: "./vendor-management.component.html",
  styleUrls: ["./vendor-management.component.css"],
})
export class vendorManagementComponent {
  // roles = [ 'Data Entry', 'Data Analyst', 'Product Owner' ];

  user: UserAccount;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.user = new UserAccount();
  }

  onSubmit(element: NgForm) {
    let FV = element.value;
    let vendorId: string;

    let employee = new Employee();

    // employee.userAccount.username = FV.username;
    // employee.userAccount.password = FV.password;
    // employee.userAccount.email = FV.email;

    this.user.username = FV.username;
    this.user.password = FV.password;
    this.user.email = FV.email;
    employee.userAccount = this.user;
    employee.role = FV.role;

    // this.user.Role = FV.role;
    vendorId = Cookie.get("user_id");

    console.log("vendor component name: " + vendorId);
    this.userService.saveUser(employee, vendorId).subscribe();
  }

  gotoUserList() {
    this.router.navigate(["/validation"]);
  }
}
