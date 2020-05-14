import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubneteoComponent } from './subneteo.component';

describe('SubneteoComponent', () => {
  let component: SubneteoComponent;
  let fixture: ComponentFixture<SubneteoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubneteoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubneteoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
