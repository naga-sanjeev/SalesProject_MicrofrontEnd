import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownComponent } from './dropdown.component';
import { EventEmitter } from '@angular/core';
import { DataService } from '../../Services/data.service';

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;
  const event = '';
  let dataService: DataService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropdownComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dataService = TestBed.inject(DataService);
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
  it('should call updateValue when event value is truthy', () => {
    const event = { value: 'selected value' };
    spyOn(dataService, 'dropdownValues'); 
    component.updateValue(event);
    expect(component.selectedState).toEqual(event.value);
    expect(component.group).toEqual([component.placeholderValue, event.value]);
    expect(dataService.dropdownValues).toHaveBeenCalledWith(component.group);
  });
  it('should call updateValue when event value is falsy', () => {
    const event = { value: null }; 
    spyOn(dataService, 'dropdownValues'); 
    component.updateValue(event);
    expect(component.selectedState).toBeUndefined();
    expect(component.group).toEqual([]);
    expect(dataService.dropdownValues).not.toHaveBeenCalled();
  });
  it('should call patchData', () => {
    component.patchData(event);
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
  it('should call ngOnInit()', () => {
    const selectedState = 'SomeState';
    const options = [{ name: 'SomeState', value: 'SomeValue' }];
    component.selectedState = selectedState;
    component.options = options;
    component.ngOnInit();
    expect(component.value).toEqual(options[0]);
  });
  it('should call ngOnChanges()', () => {
    const selectedState = 'SomeState';
    const options = [{ name: 'SomeState', value: 'SomeValue' }];
    component.selectedState = selectedState;
    component.options = options;
    component.ngOnChanges();
    expect(component.value).toEqual(options[0]);
  });
  it('should call onOptionSelect', () => {
    component.onOptionSelect(event);
  });

});
