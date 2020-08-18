// Angular
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
// Layout
import { OffcanvasOptions } from '../../../../core/_base/layout';
import { AppState } from '../../../../core/reducers';
import { currentUser, Logout, User } from '../../../../core/auth';
import {CookieService} from "ng2-cookies";

@Component({
  selector: 'kt-quick-user-panel',
  templateUrl: './quick-user-panel.component.html',
  styleUrls: ['./quick-user-panel.component.scss']
})
export class QuickUserPanelComponent implements OnInit {
  user$: Observable<User>;
  // Public properties
  offcanvasOptions: OffcanvasOptions = {
    overlay: true,
    baseClass: 'offcanvas',
    placement: 'right',
    closeBy: 'kt_quick_user_close',
    toggleBy: 'kt_quick_user_toggle'
  };

  constructor(private store: Store<AppState>,private cookie: CookieService) {

  }

  /**
   * On init
   */
  ngOnInit(): void {
    this.user$ = this.store.pipe(select(currentUser));
  }

  /**
   * Log out
   */
  logout() {
    this.cookie.deleteAll('/','/')
    this.cookie.deleteAll('/ecommerce','localhost')
    this.cookie.deleteAll('/user-management','localhost')
    this.cookie.deleteAll('/ecommerce','/')
    this.cookie.deleteAll('/user-management','/')
    this.cookie.deleteAll();
    console.log("cookie hi",this.cookie.get("access_token"))
    this.store.dispatch(new Logout());
  }
}
