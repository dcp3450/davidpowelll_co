import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, flatMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  apiUrl = 'https://admin.davidpowell.co/wp-json';
  showHireMe = new BehaviorSubject<boolean>(false);
  showLoader = new BehaviorSubject<boolean>(true);

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
    private titleService: Title,
    private metaService: Meta
  ) { }

  public getNavigation() {
    return this.http.get(`${this.apiUrl}/wp-api-menus/v2/menus/`)
    .pipe(
      map((res: any) => res),
      flatMap(menus => {
        let body;
        menus.forEach(menu => {
          if (menu.slug === 'main-menu') {
            body = this.http.get(menu.meta.links.self);
          }
        });
        return body;
      })
    );
  }

  public sendHireMsg(from: string, msg: string) {
    const body = {
      email: from,
      message: msg
    };

    return this.http.post(`https://admin.davidpowell.co/process/process.php`, body);
  }

  public getShowHireMeState() {
    return this.showHireMe.asObservable();
  }

  public setShowHireMeState(value: boolean) {
    this.showHireMe.next(value);
  }

  public getShowLoaderState() {
    return this.showLoader.asObservable();
  }

  public setShowLoaderState(value: boolean) {
    this.showLoader.next(value);
  }

  public setTitle(title: string) {
    this.titleService.setTitle(title);
  }

  public setMeta(meta: any[]) {
    this.metaService.addTags(meta);
  }
}
