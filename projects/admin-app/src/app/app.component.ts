import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'admin-app';
  currenYearFormat:number = new Date().getFullYear();
  display: boolean | undefined;
  // displayForgotDialog: boolean;
  loginForm: FormGroup =this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  loginRes: any;
  role: any
  password: any
  name: any
  key:boolean=true
  visible: boolean = true
  changetype: boolean = true
  constructor(private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {



    
  }

  onClick(){
this.key=!this.key
  }

  viewPass() {
    this.visible = !this.visible
    this.changetype = !this.changetype
  }
  login() {
    const body = {
      "username": this.loginForm
      // "password": this.loginForm.controls.password.value
    }
    let status = ''
    // if(body.username=='admin' && body.password=='admin'){
    //   this.router.navigateByUrl('root/admin');
    // }
   
  }
  registration() {
    this.display = true;
  }
}
