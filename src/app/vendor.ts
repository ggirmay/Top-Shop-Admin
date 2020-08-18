import {Address} from "./core/model/address";
import {PaymentInformation} from "./core/model/paymentInformation";
import {UserAccount} from "./core/model/userAccount";


export class Vendor {
  id: String;
  name: String;
  moto: String;
  imageLogoName: String;

  address: Address;

  paymentInformation: PaymentInformation[];

  userAccount: UserAccount;
}
