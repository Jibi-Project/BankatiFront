import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreancierDetailsComponent } from './creancier-details.component';

describe('CreancierDetailsComponent', () => {
  let component: CreancierDetailsComponent;
  let fixture: ComponentFixture<CreancierDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreancierDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreancierDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
