import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { DetailsService } from '../../Services/details.service';
import { DataService } from '../../Services/data.service';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let detailsService: DetailsService;
  let messageService: MessageService;
  let dataService: DataService;
  let router: Router;
  let dialogService: DialogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableComponent],
      providers: [HttpClient, HttpHandler, MessageService, DialogService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    detailsService = TestBed.inject(DetailsService);
    messageService = TestBed.inject(MessageService);
    dataService = TestBed.inject(DataService);
    router = TestBed.inject(Router);
    dialogService = TestBed.inject(DialogService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call ngOnChanges', () => {
    component.ngOnChanges();
  });
  it('should call showArchitecture', () => {
    component.showArchitecture();
  });
  it('should call onClick', () => {
    const rowData = {}
    component.onClick(rowData);
  });
  it('should call goToProjectInfo and navigate to edit project page', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({ userLogin: { role: 'Project Manager' } }));
    const projectId = '123';
    const data = { projectId };
    spyOn(router, 'navigate');
    component.goToProjectInfo(data);
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard/edit-existing-project/', projectId]);
  });
  it('should call goToProjectInfo and navigate to project info', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({ userLogin: { role: 'other user' } }));
    const projectId = '123';
    const data = { projectId };
    spyOn(router, 'navigate');
    component.goToProjectInfo(data);
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard/project-info/', projectId]);
  });
  it('should call openDialog', () => {
    const rowData = { IndustryType: 'Test Industry' };
    spyOn(dialogService, 'open');
    component.openDialog(rowData);
  });
  it('should call openDialog1', () => {
    const rowData = { IndustryType: 'Test Industry' };
    const column = '';
    spyOn(dialogService, 'open');
    component.openDialog1(rowData, column);
  });
  it('should call openDialog2', () => {
    const rowData = { IndustryType: 'Test Industry' };
    const column = '';
    spyOn(dialogService, 'open');
    component.openDialog2(rowData, column);
  });
  it('should call openDialog3', () => {
    const rowData = { IndustryType: 'Test Industry' };
    spyOn(dialogService, 'open');
    component.openDialog3(rowData);
  });
  it('should call downloadImage', () => {
    const imageUrl = '';
    component.downloadImage(imageUrl);
  });
  
});
