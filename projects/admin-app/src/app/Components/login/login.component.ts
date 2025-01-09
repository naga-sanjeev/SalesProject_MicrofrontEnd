import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DetailsService } from '../../Services/details.service';
import { loginUserQuery } from '../../Services/query'
import { DataService } from '../../Services/data.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  InputFieldName: string = "Username";
  InputPasswordName: string = "Password";
  buttonName: string = "Login";
  color: string = '#00aae7';
  users: any;
  toastValue: boolean = false
  sideLinkValue: any
  loginButton: string = '#00aae7';
  userMinLengthError: string = 'Username must be 4 characters long.';
  passwordMinLengthError: string = 'Password must be 6 characters long.';
  control: FormControl;
  constructor(private router: Router, private messageService: MessageService, private fb: FormBuilder, private details: DetailsService, private dataService: DataService) {
    this.control = new FormControl('');
  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const _obj: any = {
        username: this.loginForm.value.username as string,
        password: this.loginForm.value.password as string,
      }
      this.details.getUsers(loginUserQuery, _obj).subscribe((res: any) => {
        this.users = res.data;
        if (this.users != null && this.users != '') {
          localStorage.setItem('Login', JSON.stringify(this.users));
          if (this.users.userLogin.role == "Project Manager") {
            this.toastValue = true
            this.router.navigate(['/dashboard/add-existing-project'])
            this.sendMessage(this.toastValue)
          }
          else if (this.users.userLogin.role == "Sales Lead") {
            this.toastValue = true
            this.sendMessage(this.toastValue)
            this.router.navigate(['/dashboard/projects'])
          }
          else if (this.users.userLogin.role == "Sales Trainee") {
            this.toastValue = true
            this.sendMessage(this.toastValue)
            this.router.navigate(['/dashboard/projects'])
          }
          localStorage.setItem('Sidebar', JSON.stringify('projects'));
        }
        else {
          this.messageService.add({ severity: 'error', detail: 'Please enter valid username (or) password' });
          this.loginForm.reset();
        }
        this.dataService.user(this.users);
      });
    }
    else {
      const controls = this.loginForm.controls;
      Object.keys(controls).forEach(key => {
        controls[key].markAsTouched();
        controls[key].markAsDirty();
      })
    }
  }
  sendMessage(e: any) {
    this.dataService.toastMessage(e);
  }

}
