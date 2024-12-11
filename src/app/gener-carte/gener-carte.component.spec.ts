import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerCarteComponent } from './gener-carte.component';

describe('GenerCarteComponent', () => {
  let component: GenerCarteComponent;
  let fixture: ComponentFixture<GenerCarteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenerCarteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerCarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
