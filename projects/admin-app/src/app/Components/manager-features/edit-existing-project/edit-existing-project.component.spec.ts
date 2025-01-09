import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExistingProjectComponent } from './edit-existing-project.component';
import { FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DetailsService } from '../../../Services/details.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('EditExistingProjectComponent', () => {
  let component: EditExistingProjectComponent;
  let fixture: ComponentFixture<EditExistingProjectComponent>;
  let detailsService: DetailsService;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditExistingProjectComponent],
      providers: [FormBuilder, DatePipe, DetailsService, HttpClient, HttpHandler, MessageService,
        {
          provide: ActivatedRoute,
          useValue: {},
        }]
    })
      .compileComponents();
    messageServiceSpy = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
    detailsService = TestBed.inject(DetailsService);
    fixture = TestBed.createComponent(EditExistingProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
  it('should call onAccountType()', () => {
    const mockData = {
      data: {
        getAccounts: [
          { accountType: 'AccountType 1', code: 'Code 1' },
          { accountType: 'AccountType 2', code: 'Code 2' }
        ]
      }
    };
    spyOn(detailsService, 'getAccountDropdownData').and.returnValue(of(mockData));
    component.onAccountType();
    expect(component.accountsDropdownData.length).toBe(2);
    expect(component.accountsDropdownData[0]).toEqual({ name: 'AccountType 1', code: 'AccountType 1' });
    expect(component.accountsDropdownData[1]).toEqual({ name: 'AccountType 2', code: 'AccountType 2' });
  });
  it('should call statusName()', () => {
    const mockData = {
      data: {
        getStatus: [
          { status: 'StatusName 1', code: 'Code 1' },
          { status: 'StatusName 2', code: 'Code 2' }
        ]
      }
    };
    spyOn(detailsService, 'getStatusDropdownData').and.returnValue(of(mockData));
    component.statusName();
    expect(component.statusDropdown.length).toBe(2);
    expect(component.statusDropdown[0]).toEqual({ name: 'StatusName 1', code: 'StatusName 1' });
    expect(component.statusDropdown[1]).toEqual({ name: 'StatusName 2', code: 'StatusName 2' });
  });
  it('should call addExistingProject when form is valid', () => {
    const mockFormData = {
      clientName: 'clientName',
      projectName: 'projectName',
      industryType: 'industryType',
      accountType: 'accountType',
      practiceName: 'practiceName',
      status: 'status',
      startDate: '2024-03-22',
      endDate: '2025-03-22',
      technology: 'technology',
      description: 'description',
    };

    spyOn(detailsService, 'editExistingProjectManager').and.returnValue(of({}));
    component.editForm.setValue(mockFormData);
    component.addExistingProject();
    expect(detailsService.editExistingProjectManager).toHaveBeenCalled();
  });
  it('should call addExistingProject when form is invalid', () => {
    component.editForm.setValue({
      clientName: '',
      projectName: '',
      industryType: '',
      accountType: '',
      practiceName: '',
      status: '',
      startDate: '',
      endDate: '',
      technology: '',
      description: '',
    });
    spyOn(detailsService, 'postAddNewClientData');
    spyOn(component.editForm, 'reset');
    component.addExistingProject();
    expect(detailsService.postAddNewClientData).not.toHaveBeenCalled();
  });
  it('should call reset', () => {
    const projectDataMock = [{
      clientName: 'clientName',
      projectName: 'projectName',
      industryType: 'industryType',
      accountType: 'accountType',
      practiceName: 'practiceName',
      status: 'status',
      startDate: '2024-03-22',
      endDate: '2025-03-22',
      technology: 'technology',
      description: 'description',
    }];
    component.filteredTableData = projectDataMock;
    spyOn(component, 'patchingValue');
    component.reset();
    expect(component.patchingValue).toHaveBeenCalledWith(projectDataMock);
  });
  it('should call getManagerTableData', () => {
    const responseData = { data: { getMyActivitiesOfUser: [{ projectId: 123, practiceName: 'Test', industryType: 'Technology' }] } };
    spyOn(detailsService, 'managerMyActivites').and.returnValue(of(responseData));
    component.getManagerTableData();
    expect(component.data.length).toBe(20);
    expect(component.filteredTableData.length).toBe(0);
  });
});
