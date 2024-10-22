import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 
import { map } from 'rxjs/operators';
import { ArticalMetadata } from '../features/navagation/models/artical-metadata';

@Injectable({
  providedIn: 'root'
})
export class ArticalRetrivalService {
  constructor(private http: HttpClient) {}

  getMarkdownFiles(parent: string): Observable<ArticalMetadata[]> {
    return this.http.get<{ articles: { parent: string, loc: string, navIndentation: number }[] }>('./assets/config/articals.json').pipe(
      map(response => response.articles
        .filter(article => article.parent === parent)
        .map(article => new ArticalMetadata(article.loc, article.navIndentation))
      )
    );
  }
}
