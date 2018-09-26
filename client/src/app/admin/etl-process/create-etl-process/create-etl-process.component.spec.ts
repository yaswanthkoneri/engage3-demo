import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEtlProcessComponent } from './create-etl-process.component';

describe('CreateEtlProcessComponent', () => {
  let component: CreateEtlProcessComponent;
  let fixture: ComponentFixture<CreateEtlProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEtlProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEtlProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
