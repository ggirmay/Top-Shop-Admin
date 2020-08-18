// Angular
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// RxJS
import { Observable, Subject } from 'rxjs';
import { finalize, takeUntil, tap } from 'rxjs/operators';
// Translate
import { TranslateService } from '@ngx-translate/core';
// Store
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/reducers';
// Auth
import {AuthNoticeService, Login, Role} from '../../../../core/auth';
import {AuthService} from "../../../../core/auth/_services/auth.service";
import {Cookie} from "ng2-cookies";
/**
 * ! Just example => Should be removed in development
 */
const DEMO_PARAMS = {
	EMAIL: 'admin44',
	PASSWORD: 'admin'
};

@Component({
	selector: 'kt-login',
	templateUrl: './login.component.html',
	encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy {
	// Public params
	loginForm: FormGroup;
	loading = false;
	isLoggedIn$: Observable<boolean>;
	errors: any = [];

	private unsubscribe: Subject<any>;

	private returnUrl: any;


	constructor(
		private router: Router,
		private auth: AuthService,
		private authNoticeService: AuthNoticeService,
		private translate: TranslateService,
		private store: Store<AppState>,
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef,
		private route: ActivatedRoute
	) {
		this.unsubscribe = new Subject();
	}


	ngOnInit(): void {
		this.initLoginForm();

		// redirect back to the returnUrl before login
		this.route.queryParams.subscribe(params => {
			this.returnUrl = params.returnUrl || '/';
		});
	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		this.authNoticeService.setNotice(null);
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}


	initLoginForm() {
		// demo message to show
		if (!this.authNoticeService.onNoticeChanged$.getValue()) {
			const initialNotice = ``;
			this.authNoticeService.setNotice(initialNotice, 'info');
		}

		this.loginForm = this.fb.group({
			email: [DEMO_PARAMS.EMAIL, Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(320)
			])
			],
			password: [DEMO_PARAMS.PASSWORD, Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			])
			]
		});
	}

	/**
	 * Form Submit
	 */
	submit() {
	  Cookie.deleteAll('/','localhost');
	  Cookie.delete("access_token",'/','/')
    Cookie.delete("role",'/','/')
    Cookie.delete("user_id",'/','/')


	  if(Cookie.getAll()!=null)
      Cookie.deleteAll('/ecommerce','localhost');
    if(Cookie.getAll()!=null)
      Cookie.deleteAll();

    localStorage.clear();
		const controls = this.loginForm.controls;
		/** check form */
		if (this.loginForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;

		}

		this.loading = true;
    console.log(controls);
		const authData = {
			email: controls.email.value,
			password: controls.password.value
		};


    this.auth
      .login(authData.email, authData.password).subscribe(
      (data)=>{
        if (data!=null||data!==null||data!=undefined) {
          console.log("data",data)
          this.store.dispatch(new Login({authToken: data.accessToken}));
          this.router.navigateByUrl('user-management/dashboard')
          // this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
          //   this.router.navigate(['/user-management/dashboard']);
          // });
        }
        else{
          this.router.navigateByUrl('auth/login')
        }
      },
      (err)=>{
        this.router.navigateByUrl('auth/login')
      }
    );

    this.loading = false;
    this.cdr.markForCheck();
	}

	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.loginForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}
}
