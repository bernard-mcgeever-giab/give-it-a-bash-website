import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ArticalDisplayComponent } from './artical-display.component';
import { MarkdownService } from '../../services/markdown.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

describe('ArticalDisplayComponent', () => {
  let component: ArticalDisplayComponent;
  let fixture: ComponentFixture<ArticalDisplayComponent>;
  let mockMarkdownService: jasmine.SpyObj<MarkdownService>;

  beforeEach(() => {
    mockMarkdownService = jasmine.createSpyObj('MarkdownService', ['getMarkdownContent']);

    TestBed.configureTestingModule({
      imports: [ArticalDisplayComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ file: 'example-file.md' })
          }
        },
        { provide: MarkdownService, useValue: mockMarkdownService }
      ]
    });

    fixture = TestBed.createComponent(ArticalDisplayComponent);
    component = fixture.componentInstance;

    mockMarkdownService.getMarkdownContent.and.returnValue(of('# Mocked Markdown Content'));
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve markdown content on init', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(mockMarkdownService.getMarkdownContent).toHaveBeenCalledWith('assets/articals/example-file.md');
    expect(component.markdownContent).toEqual('# Mocked Markdown Content');
  });
});
