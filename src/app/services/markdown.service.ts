import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { marked } from 'marked';

@Injectable({
  providedIn: 'root'
})
export class MarkdownService {
  constructor(private http: HttpClient) {}

  getMarkdownContent(url: string): Observable<string> {
    return this.http.get(url, { responseType: 'text' }).pipe(
      map((markdown: string) => {
        const htmlContent = marked.parse(markdown);
        return typeof htmlContent === 'string' ? htmlContent : '<p class=\'error\'> unable to find artical</p>';
      }),
      catchError((error) => {
        console.error('Error loading markdown content:', error);
        return of(`<p class='error'> unable to find article</p>`);
      })
    );
  }
}
