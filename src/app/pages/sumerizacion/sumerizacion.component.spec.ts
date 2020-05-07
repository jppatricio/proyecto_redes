import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SumerizacionComponent } from './sumerizacion.component';

describe('SumerizacionComponent', () => {
  let component: SumerizacionComponent;
  let fixture: ComponentFixture<SumerizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SumerizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SumerizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
