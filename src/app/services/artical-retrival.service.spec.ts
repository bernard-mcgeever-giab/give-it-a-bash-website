import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ArticalRetrivalService } from './artical-retrival.service';
import { ArticalMetadata } from '../features/navagation/models/artical-metadata';

describe('ArticalRetrivalService', () => {
  let service: ArticalRetrivalService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArticalRetrivalService]
    });
    service = TestBed.inject(ArticalRetrivalService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve and map markdown files correctly for a given parent', () => {
    const mockResponse = {
      articles: [
        { parent: 'products', loc: 'path/to/file1.md', navIndentation: 1 },
        { parent: 'products', loc: 'path/to/file2.md', navIndentation: 2 },
        { parent: 'education', loc: 'path/to/file3.md', navIndentation: 1 }
      ]
    };

    const expectedArticles: ArticalMetadata[] = [
      new ArticalMetadata('path/to/file1.md', 1),
      new ArticalMetadata('path/to/file2.md', 2)
    ];

    service.getMarkdownFiles('products').subscribe(articles => {
      expect(articles.length).toBe(2);
      expect(articles).toEqual(expectedArticles);
    });

    const req = httpMock.expectOne('./assets/config/articals.json');
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });

  it('should return an empty array when no articles match the parent', () => {
    const mockResponse = {
      articles: [
        { parent: 'education', loc: 'path/to/file1.md', navIndentation: 1 }
      ]
    };

    service.getMarkdownFiles('products').subscribe(articles => {
      expect(articles.length).toBe(0);
    });

    const req = httpMock.expectOne('./assets/config/articals.json');
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });

  it('should return an empty array when no articles are returned in the response', () => {
    const mockResponse = {
      articles: []
    };

    service.getMarkdownFiles('products').subscribe(articles => {
      expect(articles.length).toBe(0);
    });

    const req = httpMock.expectOne('./assets/config/articals.json');
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });
});
