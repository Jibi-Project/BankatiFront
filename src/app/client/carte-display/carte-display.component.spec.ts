import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteDisplayComponent } from './carte-display.component';

describe('CarteDisplayComponent', () => {
  let component: CarteDisplayComponent;
  let fixture: ComponentFixture<CarteDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarteDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarteDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
