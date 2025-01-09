import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, AbstractControl, ValidationErrors, NG_VALIDATORS, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { DataService } from '../../Services/data.service';
const MY_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputComponent),
  multi: true
};

const USER_PROFILE_VALIDATORS: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => InputComponent),
  multi: true
};
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})

export class InputComponent implements OnInit, ControlValueAccessor {
  @Input() InputFieldName: any;
  @Input() icon: string = "";
  @Input() startIcon: string = '';
  @Input() endIcon: string = '';
  @Input() useMarginLeft: boolean = false;
  @Input() minlengthError: string = '';
  @Input() control: any;
  value: any = '';
  onChange: any = () => { };
  onTouch: any = () => { };
 
  constructor(private dataService:DataService) { }

  ngOnInit(): void {
  }

  isPassword: boolean = false;
  showPassword: boolean = false;

  ngOnChanges() {
    this.isPassword = this.InputFieldName === 'Password';
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
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

  updateValue(val: any): void {
    this.value = val.target?.value;
    this.control?.setValue(this.value);
    this.value = val.target?.value;
    console.log(this.value);
    this.dataService.setInputData(this.value);
    this.onChange(val);
    this.onTouch(val);
    if (this.value?.trim() === '') {
      this.control.setErrors({ 'required': true });
    } else {
      this.control?.setErrors(null);
    }

    this.onChange(this.value);
    this.onTouch();
    this.control?.markAsDirty(); 
  }

  get iconClass(): string {
    return `pi-${this.icon}`;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return control.value ? null : { required: true };
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
}