import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Changepassword2UComponent } from './changepassword2-u.component';

describe('Changepassword2UComponent', () => {
  let component: Changepassword2UComponent;
  let fixture: ComponentFixture<Changepassword2UComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Changepassword2UComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Changepassword2UComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
