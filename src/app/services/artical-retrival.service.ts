import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticalRetrivalService {

  private basePath = 'assets/articals/';

  constructor() {}

  getMarkdownFiles(): Observable<string[]> {
    return new Observable<string[]>(observer => {
      const files = [
        'articals/about/about.md',
        'articals/education/design-patterns/behavioural-design-patterns.md',
        'articals/education/design-patterns/creational-design-patterns/abstract-factory.md',
        'articals/education/design-patterns/creational-design-patterns/bulder.md',
        'articals/education/design-patterns/creational-design-patterns/factory.md',
        'articals/education/design-patterns/creational-design-patterns/prototype.md',
        'articals/education/design-patterns/creational-design-patterns/singleton.md',
        'articals/education/design-patterns/design-patterns.md',
        'articals/education/design-patterns/structoral-design-patterns.md',
        'articals/education/queing/queing.md',
        'articals/education/spring-api/spring-api.md'
    ];
      observer.next(files);
      observer.complete();
    });
  }
}
