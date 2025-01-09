import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyActivitiesComponent } from './my-activities.component';
import { DetailsService } from '../../../Services/details.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { of } from 'rxjs';

describe('MyActivitiesComponent', () => {
  let component: MyActivitiesComponent;
  let fixture: ComponentFixture<MyActivitiesComponent>;
  let detailsService: DetailsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyActivitiesComponent ],
      providers: [DetailsService, HttpClient, HttpHandler, FormBuilder, DatePipe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyActivitiesComponent);
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
  it('should call reset', () => {
    const gettable = spyOn(component, 'getTableData')
    component.reset();
    expect(gettable).toHaveBeenCalled();
  });
  it('should call remove', () => {
    spyOn(component, 'getTableData');
    component.remove();
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
  it('should call search', () => {
    component.search();
  });
  it('should call getTableData', () => {
    spyOn(detailsService, 'myActivities').and.returnValue(of({ data: { getMyActivitiesOfUser: [] } }));
    component.getTableData();
    expect(component.tableData.length).toBe(0);
    expect(component.filteredTableData.length).toBe(0);
  });
  it('should call getManagerTableData', () => {
    spyOn(detailsService, 'managerMyActivites').and.returnValue(of({ data: { getMyActivitiesOfUser: [] } }));
    component.getManagerTableData();
    expect(component.tableData.length).toBe(0);
    expect(component.filteredTableData.length).toBe(0);
  });
  it('should call roleBaseTableHeaders when userRole is Project Manager', () => {
    spyOn(component, 'getManagerTableData');
    component.userRole = 'Project Manager';
    component.roleBaseTableHeaders();
    expect(component.cols).toEqual([
      { field: 'clientName', header: 'Client Name' },
      { field: 'industryType', header: 'Industry Type' },
      { field: 'practiceName', header: 'Practice Name' },
      { field: 'architecture', header: 'Architecture' },
      { field: 'projectInfo', header: 'Project Info' },
      { field: 'Actions', header: 'Actions' }
    ]);
    expect(component.getManagerTableData).toHaveBeenCalled();
  });
  it('should call roleBaseTableHeaders when userRole is Sales Lead', () => {
    spyOn(component, 'getTableData');
    component.userRole = 'Sales Lead';
    component.roleBaseTableHeaders();
    expect(component.cols).toEqual([
      { field: 'clientName', header: 'Client Name' },
      { field: 'industryType', header: 'Industry Type' },
      { field: 'practiceName', header: 'Practice Name' },
      { field: 'date', header: 'Date' },
      { field: 'name', header: 'Submitted By' },
      { field: 'notes', header: 'Notes' },
      { field: 'Actions', header: 'Actions' }
    ]);
    expect(component.getTableData).toHaveBeenCalled();
  });
});
