import { TestBed } from '@angular/core/testing';

import { DetailsService } from './details.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('DetailsService', () => {
  let service: DetailsService;
  const mockQuery = '';
  const mockParams = 'mockParams';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DetailsService, HttpClient, HttpHandler]
    });
    service = TestBed.inject(DetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call getUsers', () => {
    service.getUsers(mockQuery, mockParams);
  });
  it('should call getIndustryDropdownData', () => {
    service.getIndustryDropdownData(mockQuery);
  });
  it('should call getPracticesDropdownData', () => {
    service.getPracticesDropdownData(mockQuery);
  });
  it('should call getAccountDropdownData', () => {
    service.getAccountDropdownData(mockQuery);
  });
  it('should call getStatusDropdownData', () => {
    service.getStatusDropdownData(mockQuery);
  });
  it('should call getmenuData', () => {
    service.getmenuData(mockQuery);
  });
  it('should call postAddNewClientData', () => {
    service.postAddNewClientData(mockQuery, mockParams);
  });
  it('should call myActivities', () => {
    service.myActivities(mockQuery, mockParams);
  });
  it('should call projectsTableData', () => {
    service.projectsTableData(mockQuery);
  });
  it('should call myTeamActivities', () => {
    service.myTeamActivities(mockQuery, mockParams);
  });
  it('should call postExistingProjectData', () => {
    service.postExistingProjectData(mockQuery, mockParams);
  });
  it('should call deleteTableRow', () => {
    service.deleteTableRow(mockQuery, mockParams);
  });
  it('should call autoCompleteProject', () => {
    service.autoCompleteProject(mockQuery);
  });
  it('should call editExistingProjectManager', () => {
    service.editExistingProjectManager(mockQuery, mockParams);
  });
  it('should call editSalesTrainee', () => {
    service.editSalesTrainee(mockQuery, mockParams);
  });
  it('should call managerMyActivites', () => {
    service.managerMyActivites(mockQuery, mockParams);
  });
});
