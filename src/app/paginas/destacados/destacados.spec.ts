import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestacadosComponent } from './destacados';

describe('Destacados', () => {
  let component: DestacadosComponent;
  let fixture: ComponentFixture<DestacadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestacadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestacadosComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
