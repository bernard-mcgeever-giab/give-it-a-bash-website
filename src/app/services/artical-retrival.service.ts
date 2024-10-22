import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticalRetrivalService {
  constructor(private http: HttpClient) {}

  getMarkdownFiles(): Observable<string[]> {
    return this.http.get<{ articles: string[] }>('./assets/config/articals.json').pipe(
      map(response => response.articles)
    );
  }
}
