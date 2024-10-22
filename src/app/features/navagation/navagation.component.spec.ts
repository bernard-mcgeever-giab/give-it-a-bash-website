import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NavagationComponent } from './navagation.component';
import { ArticalRetrivalService } from '../../services/artical-retrival.service';
import { of } from 'rxjs';
import { ArticalMetadata } from './models/artical-metadata';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

describe('NavagationComponent', () => {
  let component: NavagationComponent;
  let fixture: ComponentFixture<NavagationComponent>;
  let mockArticalRetrivalService: jasmine.SpyObj<ArticalRetrivalService>;

  beforeEach(() => {
    mockArticalRetrivalService = jasmine.createSpyObj('ArticalRetrivalService', ['getMarkdownFiles']);

    TestBed.configureTestingModule({
      imports: [CommonModule, RouterModule.forRoot([]), NavagationComponent], // Add CommonModule and RouterModule
      providers: [
        { provide: ArticalRetrivalService, useValue: mockArticalRetrivalService }
      ]
    });

    fixture = TestBed.createComponent(NavagationComponent);
    component = fixture.componentInstance;

    const mockProductArticles: ArticalMetadata[] = [{ loc: 'product.md', navIndentation: 0 }];
    const mockEducationArticles: ArticalMetadata[] = [{ loc: 'education.md', navIndentation: 0 }];

    mockArticalRetrivalService.getMarkdownFiles.and.callFake((category: string) => {
      return category === 'products' ? of(mockProductArticles) : of(mockEducationArticles);
    });
  });

  it('should create the navigation component', () => {
    expect(component).toBeTruthy();
  });

  it('should load product and education articles on init', () => {
    component.ngOnInit();
    
    expect(mockArticalRetrivalService.getMarkdownFiles).toHaveBeenCalledWith('products');
    expect(mockArticalRetrivalService.getMarkdownFiles).toHaveBeenCalledWith('education');
    
    expect(component.productArticles.length).toBe(1);
    expect(component.productArticles[0].loc).toBe('product.md');
    expect(component.productArticles[0].navIndentation).toBe(0);
    
    expect(component.educationArticles.length).toBe(1);
    expect(component.educationArticles[0].loc).toBe('education.md');
    expect(component.educationArticles[0].navIndentation).toBe(0);
  });

  it('should toggle navigation menu', () => {
    expect(component.isNavOpen).toBe(false);

    component.toggleNav(new MouseEvent('click'));
    expect(component.isNavOpen).toBe(true);

    component.toggleNav(new MouseEvent('click'));
    expect(component.isNavOpen).toBe(false);
  });

  it('should toggle dropdown menu', () => {
    expect(component.isDropdownOpen['education']).toBe(false);
    
    component.toggleDropdown(new MouseEvent('click'), 'education');
    expect(component.isDropdownOpen['education']).toBe(true);

    component.toggleDropdown(new MouseEvent('click'), 'education');
    expect(component.isDropdownOpen['education']).toBe(false);
  });

  it('should close navigation menu when clicking outside', () => {
    component.isNavOpen = true;

    component.onDocumentClick(new MouseEvent('click'));

    expect(component.isNavOpen).toBe(false);
  });
});
