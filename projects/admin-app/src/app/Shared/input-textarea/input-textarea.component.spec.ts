import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTextareaComponent } from './input-textarea.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

describe('InputTextareaComponent', () => {
  let component: InputTextareaComponent;
  let fixture: ComponentFixture<InputTextareaComponent>;
  const event = '';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputTextareaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call writeValue', () => {
    component.writeValue(event);
  });
  it('should call registerOnChange', () => {
    component.registerOnChange(event);
  });
  it('should call registerOnTouched', () => {
    component.registerOnTouched(event);
  });
  it('should call updateValue', () => {
    component.updateValue(event);
  });

});
