import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // currenYearFormat: number = new Date().getFullYear();
  // display: boolean | undefined;
  // loginForm: FormGroup = this.fb.group({
  //   email: ['', [Validators.required]],
  //   password: ['', [Validators.required]],
  // });
  // loginRes: any;
  // role: any
  // password: any
  // name: any
  // visible: boolean = true
  // changetype: boolean = true
  loginForm: any;
  InputFieldName: string = "Username";
  InputPasswordName: string = "Password";
  buttonName: string = "Login";
  color: string = '#00aae7';
  constructor(private router: Router, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  
}
