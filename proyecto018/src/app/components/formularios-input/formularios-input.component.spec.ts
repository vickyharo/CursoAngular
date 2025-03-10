import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulariosInputComponent } from './formularios-input.component';

describe('FormulariosInputComponent', () => {
  let component: FormulariosInputComponent;
  let fixture: ComponentFixture<FormulariosInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormulariosInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulariosInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
