import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    // service = TestBed.inject(DataService);
    service=new DataService()
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should update sidebarMessage subject with the provided message sidebarMenu', () => {
    const message = 'Test Message';
    const spy = spyOn(service.sidebarMessage, 'next').and.callThrough();
    service.sidebarMenu(message);
    expect(spy).toHaveBeenCalledWith(message);
  });
  it('should update sidebarMessage subject with the provided message sidebarMenu2', () => {
    const message = 'Test Message';
    const spy = spyOn(service.mobileResponsive, 'next').and.callThrough();
    service.sidebarMenu2(message);
    expect(spy).toHaveBeenCalledWith(message);
  });
  it('should update sidebarMessage subject with the provided message mobileSideBar', () => {
    const message = 'Test Message';
    const spy = spyOn(service.mobileSideBar, 'next').and.callThrough();
    service.mobileSideMenu(message);
    expect(spy).toHaveBeenCalledWith(message);
  });
  it('should update sidebarMessage subject with the provided message projectDetails', () => {
    const message = 'Test Message';
    const spy = spyOn(service.clickingMore, 'next').and.callThrough();
    service.projectDetails(message);
    expect(spy).toHaveBeenCalledWith(message);
  });
  it('should update sidebarMessage subject with the provided message dropdownValues', () => {
    const message = 'Test Message';
    const spy = spyOn(service.passValues, 'next').and.callThrough();
    service.dropdownValues(message);
    expect(spy).toHaveBeenCalledWith(message);
  });
});
