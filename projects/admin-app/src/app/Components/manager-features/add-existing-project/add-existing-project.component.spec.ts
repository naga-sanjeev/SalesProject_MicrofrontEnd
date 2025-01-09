import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExistingProjectComponent } from './add-existing-project.component';
import { FormBuilder } from '@angular/forms';
import { DetailsService } from '../../../Services/details.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('AddExistingProjectComponent', () => {
  let component: AddExistingProjectComponent;
  let fixture: ComponentFixture<AddExistingProjectComponent>;
  let detailsService: DetailsService;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddExistingProjectComponent],
      providers: [FormBuilder, DetailsService, HttpClient, HttpHandler, DatePipe, MessageService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddExistingProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    messageServiceSpy = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
    detailsService = TestBed.inject(DetailsService);
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
  it('should set noFileText to file name if file is selected', () => {
    const mockFile = new File(['test'], 'test.png', { type: 'image/png' });
    const mockEvent = {
      target: {
        files: [mockFile]
      }
    };
    component.onFileSelected(mockEvent);
    expect(component.noFileText).toBe('test.png');
  });
  it('should set noFileText to "No file chosen..." if no file is selected', () => {
    const mockEvent = {
      target: {
        files: []
      }
    };
    component.onFileSelected(mockEvent);
    expect(component.noFileText).toBe('No file chosen...');
  });
  it('should call addExistingProject when form is valid', () => {
    const mockFormData = {
      clientName: 'clientName',
      projectName: 'projectName',
      industryType: 'industryType',
      accountType: 'accountType',
      practiceName: 'practiceName',
      status: 'status',
      technology: 'technology',
      description: 'description',
      startDate: '2024-03-22',
      endDate: '2025-03-22',
      imageUpload: ''
    };
    spyOn(detailsService, 'postExistingProjectData').and.returnValue(of({}));
    component.addProjectForm.setValue(mockFormData);
    component.addExistingProject();
    expect(detailsService.postExistingProjectData).toHaveBeenCalled();
  });
  it('should call addClientEvent when form is invalid', () => {
    component.addProjectForm.setValue({
      clientName: '',
      projectName: '',
      industryType: '',
      accountType: '',
      practiceName: '',
      status: '',
      technology: '',
      description: '',
      startDate: '',
      endDate: '',   
      imageUpload: ''
    });
    spyOn(detailsService, 'postAddNewClientData');
    spyOn(component.addProjectForm, 'reset');
    component.addExistingProject();
    expect(detailsService.postAddNewClientData).not.toHaveBeenCalled();
  });
});
