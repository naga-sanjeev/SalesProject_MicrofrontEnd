import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { DataService } from '../../../Services/data.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;
  let dataService: DataService;
  let messageService: MessageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [MessageService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
    dataService = TestBed.inject(DataService);
    messageService = TestBed.inject(MessageService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call logout', () => {
    spyOn(router, 'navigate');
    component.logout();
  });
  it('should call ngOnChanges', () => {
    component.ngOnChanges();
  });
  it('should call clickSideBar for if block', () => {
    const spyOnSideMenu = spyOn(dataService, 'sidebarMenu');
    component.clickSideBar();
    expect(spyOnSideMenu).toHaveBeenCalled();
  });
  it('should call clickSideBar for else block', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(800);
    const sidebarSpy = spyOn(dataService, 'sidebarMenu');
    const sidebarSpy2 = spyOn(dataService, 'sidebarMenu2');
    component.clickSideBar();
    expect(sidebarSpy).not.toHaveBeenCalled();
    expect(sidebarSpy2).toHaveBeenCalled();
  });
  it('should update header for small screens', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(800);
    const event = ''
    component.onResize(event);
    expect(component.header1).toBeFalsy();
    expect(component.header2).toBeTruthy();
  });

});
