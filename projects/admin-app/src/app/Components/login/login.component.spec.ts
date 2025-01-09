import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { MessageService } from 'primeng/api';
import { FormBuilder } from '@angular/forms';
import { DetailsService } from '../../Services/details.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let detailsService: DetailsService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [MessageService, FormBuilder, DetailsService, HttpClient, HttpHandler]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    detailsService = TestBed.inject(DetailsService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onLogin', () => {
    component.onLogin();
  });
  it('should call sendMessage', () => {
    const value = 'some name'
    component.sendMessage(value);
  });
  it('should call onLogin for Sales Lead', () => {
    spyOn(detailsService, 'getUsers').and.returnValue(of({ data: { userLogin: { role: 'Sales Lead' } } }));
    component.loginForm.setValue({ username: 'test', password: 'password' });
    const spyNavigate = spyOn(router, 'navigate').and.stub();
    component.onLogin();
    fixture.detectChanges();
    expect(spyNavigate).toHaveBeenCalledWith(['/dashboard/projects']);
  });
  it('should call onLogin for Sales Trainee', () => {
    spyOn(detailsService, 'getUsers').and.returnValue(of({ data: { userLogin: { role: 'Sales Trainee' } } }));
    component.loginForm.setValue({ username: 'test', password: 'password' });
    const spyNavigate = spyOn(router, 'navigate')
    component.onLogin();
    fixture.detectChanges();
    expect(spyNavigate).toHaveBeenCalledWith(['/dashboard/projects']);
  });
  it('should call onLogin for Project Manager', () => {
    spyOn(detailsService, 'getUsers').and.returnValue(of({ data: { userLogin: { role: 'Project Manager' } } }));
    component.loginForm.setValue({ username: 'test', password: 'password' });
    const spyNavigate = spyOn(router, 'navigate');
    component.onLogin();
    fixture.detectChanges();
    expect(spyNavigate).toHaveBeenCalledWith(['/dashboard/add-existing-project']);
  });
});
