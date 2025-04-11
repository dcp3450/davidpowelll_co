import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  apiUrl = 'https://admin.davidpowell.co/wp-json';

  constructor(
    private http: HttpClient
  ) { }

  public getArchivePage(slug: string) {
    return this.http.get(`${this.apiUrl}/archives/v1/${slug}`);
  }

  public getPage(slug: string) {
    return this.http.get(`${this.apiUrl}/wp/v2/pages?slug=${slug}`);
  }

  public getCustomPost(type: string, slug: string) {
    return this.http.get(`${this.apiUrl}/wp/v2/${type}?slug=${slug}`);
  }
}
