import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingProjectInfoComponent } from './existing-project-info.component';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder } from '@angular/forms';
import { DetailsService } from '../../../Services/details.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

describe('ExistingProjectInfoComponent', () => {
  let component: ExistingProjectInfoComponent;
  let fixture: ComponentFixture<ExistingProjectInfoComponent>;
  let detailsService: DetailsService;
  let messageService: MessageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ExistingProjectInfoComponent],
      providers: [DatePipe, {
        provide: ActivatedRoute,
        useValue: {},
      }, FormBuilder, DetailsService, HttpClient, HttpHandler, MessageService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ExistingProjectInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    detailsService = TestBed.inject(DetailsService);
    messageService = TestBed.inject(MessageService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onIndustryType()', () => {
    const mockResponse = {
      data: {
        getIndustries: [
          { name: 'Industry 1', code: 'Code 1' },
          { name: 'Industry 2', code: 'Code 2' }
        ]
      }
    };
    spyOn(detailsService, 'getIndustryDropdownData').and.returnValue(of(mockResponse));
    component.onIndustryType();
    expect(component.industrydropdownData.length).toBe(2);
    expect(component.industrydropdownData[0]).toEqual({ name: 'Industry 1', code: 'Industry 1' });
    expect(component.industrydropdownData[1]).toEqual({ name: 'Industry 2', code: 'Industry 2' });
  });
  it('should call onPracticeType()', () => {
    const mockData = {
      data: {
        getPractices: [
          { name: 'Practice 1', code: 'Code 1' },
          { name: 'Practice 2', code: 'Code 2' }
        ]
      }
    };
    spyOn(detailsService, 'getPracticesDropdownData').and.returnValue(of(mockData));
    component.onPracticeType();
    expect(component.practiceDropdownData.length).toBe(2);
    expect(component.practiceDropdownData[0]).toEqual({ name: 'Practice 1', code: 'Practice 1' });
    expect(component.practiceDropdownData[1]).toEqual({ name: 'Practice 2', code: 'Practice 2' });
  });
  it('should call onAccountType', () => {
    const mockResponse = { data: { getAccounts: [{ accountType: 'Account Type' }] } };
    spyOn(detailsService, 'getAccountDropdownData').and.returnValue(of(mockResponse));
    component.onAccountType();
    expect(component.AccountsDropdownData.length).toBe(1);
    expect(component.AccountsDropdownData[0]).toEqual({ name: 'Account Type', code: 'Account Type' });
  });
  it('should call patchingValue', () => {
    const data = [
      {
        clientName: 'Test Client',
        industryType: 'Technology',
        practiceName: 'Agile',
        date: '2024-03-22',
        pointOfContact: 'John Doe',
        conversation: 'Some conversation',
        requirement: 'Some requirement'
      }
    ];
    component.patchingValue(data);
    expect(component.infoForm.value).toEqual({
      clientName: 'Test Client',
      industryType: 'Technology',
      practiceName: 'Agile',
      date: new Date('2024-03-22'),
      pointOfContact: 'John Doe',
      conversation: 'Some conversation',
      requirement: 'Some requirement'
    });
  });
  it('should call getTableData', () => {
    const responseData = { data: { getMyActivitiesOfUser: [{ projectId: 123, practiceName: 'Test', industryType: 'Technology' }] } };
    spyOn(detailsService, 'myActivities').and.returnValue(of(responseData));
    component.getTableData();
    expect(component.data.length).toBe(1);
    expect(component.data[0].projectId).toBe(123);
    expect(component.projectData.length).toBe(0);
  });
  it('should call edit', () => {
    const localStorageData = {
      userLogin: { userName: 'testUser', role: 'role', reportsTo: 'reportsTo', name: 'name' }
    };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(localStorageData));
    component.projectId = '123';
    component.infoForm.setValue({
      clientName: 'Test Client',
      industryType: 'Technology',
      practiceName: 'Agile',
      date: '2024-03-25',
      pointOfContact: 'John Doe',
      conversation: 'Some conversation',
      requirement: 'Some requirement'
    });
    spyOn(detailsService, 'editSalesTrainee').and.returnValue(of({}));
    component.edit();
  });
  it('should call reset', () => {
    const projectDataMock = [{
      projectName: 'Test Project',
      industryType: 'Technology',
    }];
    component.projectData = projectDataMock;
    spyOn(component, 'patchingValue');
    component.reset();
    expect(component.patchingValue).toHaveBeenCalledWith(projectDataMock);
  });
  it('should call handleFileInput', () => {
    const fileMock = new File(['file content'], 'test.jpg', { type: 'image/jpeg' });
    const fileListMock = {
      0: fileMock,
      length: 1,
      item: (index: number) => fileMock
    };
    component.handleFileInput(fileListMock);
    expect(component.fileToUpload).toEqual(fileMock);
    const reader = new FileReader();
    reader.onload = () => {
      expect(component.imageUrl).toEqual(reader.result);
    };
    reader.readAsDataURL(fileMock);
  });


});
