import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarComponent } from './calendar.component';
import { FormBuilder, FormControl } from '@angular/forms';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  const event = '';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarComponent ],
      providers: [FormBuilder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
  it('should call updateValue if value is empty', () => {
    const control = new FormControl();
    component.control = control;
    component.selectedDate = ''; 
    component.updateValue({ target: { value: '' } });
    expect(component.control.errors).toEqual(null);
  });
  it('should call registerOnTouched', () => {
    component.registerOnTouched(event);
  });
  it('should call registerOnChange', () => {
    component.registerOnChange(event);
  });
  it('should call writeValue', () => {
    component.writeValue(event);
  });
});
