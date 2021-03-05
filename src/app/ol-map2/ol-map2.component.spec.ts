import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlMap2Component } from './ol-map2.component';

describe('OlMap2Component', () => {
  let component: OlMap2Component;
  let fixture: ComponentFixture<OlMap2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OlMap2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OlMap2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
