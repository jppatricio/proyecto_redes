import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DismissAlertComponent } from './alert.component';

describe('DismissAlertComponent', () => {
  let component: DismissAlertComponent;
  let fixture: ComponentFixture<DismissAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DismissAlertComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DismissAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
