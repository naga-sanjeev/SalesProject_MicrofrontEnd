import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import { DataService } from '../../Services/data.service';
const MY_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DropdownComponent),
  multi: true
};

const USER_PROFILE_VALIDATORS: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => DropdownComponent),
  multi: true
};
@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    }
  ]
})
export class DropdownComponent implements OnInit, ControlValueAccessor, OnChanges {
  @Input() options: any;
  @Input() selectedState: any
  @Output() valueChange = new EventEmitter();
  @Input() placeholderValue: string = " "
  @Input() optionLabel: any;
  @Input() useMarginLeft: boolean = false;
  @Input() control: any;
  group: any = []
  value: any = '';
  onChange: any = () => { };
  onTouch: any = () => { };
  @Input() optionValue: any;
  selectedValue: any
  optionSelected: any;

  constructor(private dataServie: DataService) { }

  ngOnInit(): void {
    if (this.selectedState) {
      const matchedOption = this.options.find((option: any) => option.name === this.selectedState);
      if (matchedOption) {
        this.value = matchedOption;
      }
    }
  }
  ngOnChanges(): void {
    if (this.selectedState) {
      const matchedOption = this.options.find((option: any) => option.name === this.selectedState);
      if (matchedOption) {
        this.value = matchedOption;
      }
    }
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  updateValue(event: any) {
    if (event.value) {
      this.selectedState = event.value;
      this.group.push(this.placeholderValue, event.value)
      this.dataServie.dropdownValues(this.group)
    }
  }
  patchData(value: any) {
    this.selectedState = value
  }

  getErrorStyle(): any {
    if (this.useMarginLeft) {
      return {
        'margin-left': '1px'
      };
    } else {
      return {};
    }
  }
  onOptionSelect(event: any) {
    this.optionSelected?.emit(event.value);
  }
}