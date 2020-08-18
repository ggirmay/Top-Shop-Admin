// Angular
import { Component, ElementRef, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
// Layout
import { LayoutConfigService, TranslationService } from '../../../core/_base/layout';
// Auth
import { AuthNoticeService } from '../../../core/auth';

@Component({
	selector: 'kt-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AuthComponent implements OnInit {
	// Public properties
	today: number = Date.now();
	headerLogo: string;

	/**
	 * Component constructor
	 *
	 * @param el
	 * @param render
	 * @param layoutConfigService: LayoutConfigService
	 * @param authNoticeService: authNoticeService
	 * @param translationService: TranslationService
	 * @param splashScreenService: SplashScreenService
	 */
	constructor(
		private el: ElementRef,
		private render: Renderer2,
		private layoutConfigService: LayoutConfigService,
		public authNoticeService: AuthNoticeService,
		private translationService: TranslationService,
		) {
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {

	}

	/**
	 * Load CSS for this specific page only, and destroy when navigate away
	 * @param styleUrl
	 */
	private loadCSS(styleUrl: string) {
		return null;
	}
}
