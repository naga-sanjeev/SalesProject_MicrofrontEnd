import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavComponent } from './sidenav.component';
import { DetailsService } from '../../../Services/details.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { DataService } from '../../../Services/data.service';
import { of } from 'rxjs';
import { menuItemsQuery } from '../../../Services/query';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;
  let dataService: DataService;
  let detailsService: DetailsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidenavComponent],
      providers: [DetailsService, HttpClient, HttpHandler]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dataService = TestBed.inject(DataService);
    detailsService = TestBed.inject(DetailsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call linkSelected', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(999);
    spyOn(dataService, 'mobileSideMenu')
    component.linkSelected();
    expect(component.mobileLinkSelected).toBe(true);
    expect(dataService.mobileSideMenu).toHaveBeenCalledWith(true);
  });
  it('should call isActive', () => {
    const link = 'someLink'
    component.isActive(link);
  });
  it('should call onClickSideNav', () => {
    const event = ''
    component.onClickSideNav(event);
  });

  it('should call menuData for matching role', () => {
    const finalRole = 'Sales Trainee';
    const fakeMenuData = [
      { role: 'Sales Trainee', screens: 'Projects, Add New Client' },
    ];
    spyOn(detailsService, 'getmenuData').and.returnValue(of({ data: { getMenu: fakeMenuData } }));
    component.menuData(finalRole);
    expect(component.menuItemsData.length).toBe(2); 
  });
  it('should call menuData for My Team Activities', () => {
    const finalRole = 'Sales Lead'; 
    const fakeMenuData = [
      { role: 'Sales Lead', screens: 'My Team Activities' },
    ];
    spyOn(detailsService, 'getmenuData').and.returnValue(of({ data: { getMenu: fakeMenuData } }));
    component.menuData(finalRole);
    expect(component.menuItemsData.length).toBe(1); 
  });
  it('should call menuData for Add Existing Project', () => {
    const finalRole = 'Manager'; 
    const fakeMenuData = [
      { role: 'Manager', screens: 'Add Existing Project' },
    ];
    spyOn(detailsService, 'getmenuData').and.returnValue(of({ data: { getMenu: fakeMenuData } }));
    component.menuData(finalRole);
    expect(component.menuItemsData.length).toBe(1); 
  });
  it('should call menuData for My Activities', () => {
    const finalRole = 'Manager'; 
    const fakeMenuData = [
      { role: 'Manager', screens: 'My Activities' },
    ];
    spyOn(detailsService, 'getmenuData').and.returnValue(of({ data: { getMenu: fakeMenuData } }));
    component.menuData(finalRole);
    expect(component.menuItemsData.length).toBe(1); 
  });


});
