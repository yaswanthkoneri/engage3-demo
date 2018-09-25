import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtlProcessComponent } from './etl-process.component';

describe('EtlProcessComponent', () => {
  let component: EtlProcessComponent;
  let fixture: ComponentFixture<EtlProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtlProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtlProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
