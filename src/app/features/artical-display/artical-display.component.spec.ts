import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticalDisplayComponent } from './artical-display.component';

describe('ArticalDisplayComponent', () => {
  let component: ArticalDisplayComponent;
  let fixture: ComponentFixture<ArticalDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticalDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticalDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
