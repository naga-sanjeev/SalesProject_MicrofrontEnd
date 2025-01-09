import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewClientComponent } from './add-new-client.component';
import { FormBuilder } from '@angular/forms';
import { DetailsService } from '../../../Services/details.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

describe('AddNewClientComponent', () => {
  let component: AddNewClientComponent;
  let fixture: ComponentFixture<AddNewClientComponent>;
  let detailsService: DetailsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddNewClientComponent],
      providers: [FormBuilder, DetailsService, HttpClient, HttpHandler, DatePipe, MessageService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddNewClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    detailsService = TestBed.inject(DetailsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call reset', () => {
    component.reset();
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

  it('should call addClientEvent when form is valid', () => {
    const mockFormData = {
      clientName: 'Client Name',
      sectorType: 'Industry',
      practiceType: 'Practice',
      requirement: 'Requirement',
      date: '2024-03-22',
      conversation: 'Conversation',
      poc: 'Point of Contact'
    };
    spyOn(detailsService, 'postAddNewClientData').and.returnValue(of({}));
    component.addClient.setValue(mockFormData);
    component.addClientEvent();
    expect(detailsService.postAddNewClientData).toHaveBeenCalled();
  });

  it('should call addClientEvent when form is invalid', () => {
    component.addClient.setValue({
      clientName: '',  
      sectorType: '',  
      practiceType: '', 
      requirement: '', 
      date: '',         
      conversation: '', 
      poc: ''   
    });
    spyOn(detailsService, 'postAddNewClientData');
    spyOn(component.addClient, 'reset');
    component.addClientEvent();
    expect(detailsService.postAddNewClientData).not.toHaveBeenCalled();
    expect(component.addClient.reset).not.toHaveBeenCalled();
  });

  

});
