import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsComponent } from './projects.component';
import { DetailsService } from '../../../Services/details.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
  let detailsService: DetailsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectsComponent],
      providers: [DetailsService, HttpClient, HttpHandler, FormBuilder]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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

  it('should call onAccountType', () => {
    const mockResponse = { data: { getAccounts: [{ accountType: 'Account Type' }] } };
    spyOn(detailsService, 'getAccountDropdownData').and.returnValue(of(mockResponse));
    component.onAccountType();
    expect(component.AccountsDropdownData.length).toBe(1);
    expect(component.AccountsDropdownData[0]).toEqual({ name: 'Account Type', code: 'Account Type' });
  });

  it('should call getTableData', () => {
    spyOn(detailsService, 'projectsTableData').and.returnValue(of({ data: { getProjectsTableData: [] } }));
    component.getTableData();
    expect(component.tableData.length).toBe(0);
    expect(component.filteredTableData.length).toBe(0);
  });

  it('should call reset', () => {
    spyOn(component.projectForm, 'reset');
    spyOn(component, 'getTableData');
    component.reset();
    expect(component.projectForm.reset).toHaveBeenCalled();
    expect(component.getTableData).toHaveBeenCalled();
  });

  it('should call getAutoCompleteData()', () => {
    const mockResponse = {
      data: {
        getProjects: [
          { projectId: 1, projectName: 'Project 1' }
        ]
      }
    };
    spyOn(detailsService, 'autoCompleteProject').and.returnValue(of(mockResponse));
    component.getAutoCompleteData();
    expect(component.autocompleteValues.length).toBe(1);
    expect(component.autocompleteValues[0]).toEqual({ pId: 1, label: 'Project 1' });
  });

  it('should call search', () => {
    component.search();
  });
  it('should call remove', () => {
    spyOn(component, 'getTableData');
    component.remove();
  });
  it('should call autoCompleteSelected()', () => {
    const value = ''
    component.autoCompleteSelected(value);
  });
  it('should call displayCounter', () => {
    const key = ''
    component.displayCounter(key);
  });
  it('should call dropdownSelected', () =>{
    const value = ''
    component.dropdownSelected(value);
  });
  it('should call globalSearch()', () => {
    const searchString = 'keyword';
    component.tableData = [
      { id: 1, name: 'Item 1', description: 'This is a keyword' },
      { id: 2, name: 'Item 2', description: 'Another description' }
    ];
    const event = { target: { value: searchString } };
    component.globalSearch(event);
    expect(component.filteredTableData.length).toBe(1);
    expect(component.filteredTableData[0].description).toContain(searchString);
  });

});
