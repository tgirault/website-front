import { MediaMatcher } from '@angular/cdk/layout';
import { HttpClient, HttpHeaders, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Language } from './model/language';
import { Menu } from './model/menu';
import { Message } from './model/message';
import { RestApiService } from './rest-api.service';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

/**
 * Composant principal.
 * @author Thomas Girault
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  languages: Language[];
  menus: Menu[];
  language: string;

  mobileQuery: MediaQueryList;

  content = 'Mon texte';

  private mobileQueryListener: () => void;

  /**
   * Constructeur du composant.
   * @param translate service de gestion des traductions
   */
  // tslint:disable-next-line:max-line-length
  constructor(private httpClient: HttpClient, private translate: TranslateService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    translate.setDefaultLang('fr');
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  useLanguage() {
    this.translate.use(this.language);

    const options = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Basic dXNlcjpwYXNzdzByZA==',
        'Accept-Language': this.language
      })
    };

    this.httpClient.get<Message>(environment.apiUrl + '/message/greeting', options).subscribe(response => {
      this.content = response.message;
    });


    this.httpClient.get<Menu[]>(environment.apiUrl + '/menu', options) //
      .subscribe(response => this.menus = response);
  }

  ngOnInit() {
    this.languages = [{
      value: 'fr',
      viewValue: 'fr'
    },
    {
      value: 'en',
      viewValue: 'en'
    }];

    const options = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Basic dXNlcjpwYXNzdzByZA==',
        'Accept-Language': this.language
      })
    };

    this.httpClient.get<Menu[]>(environment.apiUrl + '/menu', options) //
      .subscribe(response => this.menus = response);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }
}
