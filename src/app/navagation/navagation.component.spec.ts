import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { NavagationComponent } from './navagation.component';

describe('NavagationComponent', () => {
  let component: NavagationComponent;
  let fixture: ComponentFixture<NavagationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavagationComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({}) } }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavagationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});