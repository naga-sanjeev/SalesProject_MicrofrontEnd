import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';
import { FormControl } from '@angular/forms';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;
  const event = '';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputComponent);
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
  it('should call getErrorStyle of else condition', () => {
    component.getErrorStyle();
  });
  it('should call getErrorStyle of if condition', () => {
    component.useMarginLeft = true;
    const style = component.getErrorStyle();
    expect(style).toEqual({
      'margin-left': '1px'
    });
  });
  it('should toggle showPassword from false to true', () => {
    expect(component.showPassword).toBeFalse();
    component.togglePasswordVisibility();
    expect(component.showPassword).toBeTrue();
  });
  it('should call ngOnChanges', () => {
    component.ngOnChanges();
  });
  it('should return correct iconClass', () => {
    component.icon = 'check'; 
    expect(component.iconClass).toBe('pi-check');
  });
  it('should call updateValue if value is empty', () => {
    const control = new FormControl();
    component.control = control;
    component.value = ''; 
    component.updateValue({ target: { value: '' } });
    expect(component.control.errors).toEqual({ 'required': true });
  });
});
