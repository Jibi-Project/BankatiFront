import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoconvertComponent } from './cryptoconvert.component';

describe('CryptoconvertComponent', () => {
  let component: CryptoconvertComponent;
  let fixture: ComponentFixture<CryptoconvertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CryptoconvertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CryptoconvertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
