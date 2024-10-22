import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';

import { ArticalDisplayComponent } from './artical-display.component';
import { of } from 'rxjs';

describe('ArticalDisplayComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule], // HttpClientTestingModule to mock HttpClient requests
    declarations: [ArticalDisplayComponent],
    providers: [
      { 
        provide: ActivatedRoute, 
        useValue: {
          params: of({ id: 'some-article' }) // Mocking params for ActivatedRoute
        }
      }
    ]
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(ArticalDisplayComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
