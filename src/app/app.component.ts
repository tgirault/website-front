import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export interface Language {
  value: string;
  viewValue: string;
}

export interface Menu {
  label: string;
  path: string;
}

/**
 * Composant principal.
 * @author Thomas Girault
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {

  languages: Language[] = [
    { value: 'fr', viewValue: 'Français' },
    { value: 'en', viewValue: 'English' }
  ];

  menus: Menu[] = [
    { label: 'Accueil', path: '/home' },
    { label: 'Réservation', path: '/booking' },
    { label: 'Contact', path: '/contact' },
  ]

  language: string;

  mobileQuery: MediaQueryList;

  content = 'Mon texte';

  private _mobileQueryListener: () => void;

  /**
   * Constructeur du composant.
   * @param translate service de gestion des traductions
   */
  constructor(private translate: TranslateService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    translate.setDefaultLang('fr');
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  useLanguage() {
    this.translate.use(this.language);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
