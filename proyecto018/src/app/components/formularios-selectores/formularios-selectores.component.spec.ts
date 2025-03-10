import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulariosSelectoresComponent } from './formularios-selectores.component';

describe('FormulariosSelectoresComponent', () => {
  let component: FormulariosSelectoresComponent;
  let fixture: ComponentFixture<FormulariosSelectoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormulariosSelectoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulariosSelectoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
