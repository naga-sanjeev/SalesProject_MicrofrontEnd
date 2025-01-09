import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComponent } from './dialog.component';
import { FormBuilder } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DetailsService } from '../../Services/details.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { of } from 'rxjs';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let detailsService: DetailsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogComponent ],
      providers: [FormBuilder, DynamicDialogRef, DynamicDialogConfig, DetailsService, HttpClient, HttpHandler, DatePipe],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    detailsService = TestBed.inject(DetailsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call onClick', () => {
    component.onClick();
  });
  it('should call ngOnInit if header is "Project Architecture"', () => {
    const config: DynamicDialogConfig = {
      header: 'Project Architecture',
      data: { rowData: 'someData' }
    };
    component.config = config;
    component.ngOnInit();
    expect(component.value).toBeTrue();
  });

  it('should call ngOnInit if header is "Project History"', () => {
    const config: DynamicDialogConfig = {
      header: 'Project Edit History',
      data: { rowData: 'someData' }
    };
    spyOn(component, 'updateTimeLine');
    component.config = config;
    component.ngOnInit();
    expect(component.history).toBeTrue();
    expect(component.updateTimeLine).toHaveBeenCalled();
  });

  it('should call ngOnInit if header is "Notes"', () => {
    const config: DynamicDialogConfig = {
      header: 'Notes',
      data: { rowData: 'someData' }
    };
    component.config = config;
    component.ngOnInit();
    expect(component.salesTraineeMyActivities).toBeTrue();
  });
  it('should call parseDate', () => {
    const date = '';
    component.parseDate(date);
  });
  it('should call updateTimeLine', () => {
    spyOn(detailsService, 'historyTableData').and.returnValue(of({data: {getProjectsHistoryByProjectId: []}}))
    component.updateTimeLine();
  });
  
});
