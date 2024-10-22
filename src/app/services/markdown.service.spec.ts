import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MarkdownService } from './markdown.service';
import { marked } from 'marked';

describe('MarkdownService', () => {
  let service: MarkdownService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MarkdownService]
    });
    service = TestBed.inject(MarkdownService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve and convert markdown content to HTML', () => {
    const mockMarkdown = '# Test Article';
    const expectedHtml: string = marked.parse(mockMarkdown) as string;

    service.getMarkdownContent('assets/test.md').subscribe((htmlContent: string) => {
      expect(htmlContent).toEqual(expectedHtml);
    });

    const req = httpMock.expectOne('assets/test.md');
    expect(req.request.method).toBe('GET');

    req.flush(mockMarkdown);
  });

  it('should return an error HTML content when markdown fails to load', () => {
    const errorHtml = "<p class='error'> unable to find artical</p>";

    service.getMarkdownContent('assets/nonexistent.md').subscribe((htmlContent: string) => {
      expect(htmlContent).toEqual(errorHtml);
    });

    const req = httpMock.expectOne('assets/nonexistent.md');
    expect(req.request.method).toBe('GET');

    req.flush('Not Found', { status: 404, statusText: 'Not Found' });
  });

  it('should return error HTML content when markdown cannot be parsed', () => {
    const invalidMarkdown = '';
    const errorHtml = "<p class='error'> unable to find artical</p>";

    service.getMarkdownContent('assets/invalid.md').subscribe((htmlContent: string) => {
      expect(htmlContent).toEqual(errorHtml);
    });

    const req = httpMock.expectOne('assets/invalid.md');
    expect(req.request.method).toBe('GET');

    req.flush(invalidMarkdown);
  });
});
