import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultValueComponent } from './result-value.component';

describe('ResultValueComponent', () => {
  let component: ResultValueComponent;
  let fixture: ComponentFixture<ResultValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultValueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
