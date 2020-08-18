import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { NgForm } from "@angular/forms";

import { Vendor } from "src/app/vendor";
import {User} from "../../../../user";
import {UserService} from "../user-service.service";
import {Address} from "../../../../core/model/address";
import {PaymentInformation} from "../../../../core/model/paymentInformation";
import {UserAccount} from "../../../../core/model/userAccount";

@Component({
  selector: "app-user-form",
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.css"],
})
export class UserFormComponent {
  user: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.user = new User();
  }

  onSubmit(element: NgForm) {
    let FV = element.value;

    let address = new Address();
    address.city = FV.city;
    address.state = FV.state;
    address.addressLineOne = FV.addressLineOne;
    address.addressLineTwo = FV.addressLineTwo;

    let payments = new Array<PaymentInformation>();
    let payment = new PaymentInformation();
    payment.nameOnCard = FV.nameOnCard;
    payment.cardNumber = FV.cardNumber;
    payment.secCode = FV.secCode;
    payment.expDate = FV.expDate;
    payment.cardType = FV.cardType;
    payments.push(payment);

    let userAccount = new UserAccount();
    userAccount.username = FV.userName;
    userAccount.password = FV.password;
    userAccount.email = FV.email;

    let vendor = new Vendor();
    vendor.name = FV.name;
    vendor.moto = FV.moto;
    vendor.imageLogoName = FV.imageLogoName;
    vendor.address = address;
    vendor.paymentInformation = payments;
    vendor.userAccount = userAccount;

    console.log("vendor: " + vendor);

    this.userService.save(vendor).subscribe(
    data=>{
      console.log(data)
    }
    ,error => {
      console.log(error)
      }
      )
    ;
  }

  // onReject() {
  //   this.userService.save(this.user).subscribe(result => this.gotoUserList());
  // }

  // onApprove() {
  //   this.userService.save(this.user).subscribe(result => this.gotoUserList());
  // }

  gotoUserList() {
    this.router.navigate(["/validation"]);
  }
}
