import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { DialogComponent } from '../dialog/dialog.component';
import { DataService } from '../../Services/data.service';
import { Router } from '@angular/router';
import { DetailsService } from '../../Services/details.service';
import { deleteQuery } from '../../Services/query';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  providers: [DialogService],
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {
  @Input() searchData: string = "";
  @Input() table_Columns: any
  @Input() table_Data: any
  display: boolean = false;
  key: boolean = false;
  cols: any
  products: any
  value: any
  editForm: any;
  data: any
  showDialog: boolean = false;
  loginForm: any;
  myForm: any;
  content: boolean = false
  imgData: any;
  response: any;
  role = localStorage.getItem('Login')
  constructor(private dialogService: DialogService, private dataService: DataService, private router: Router, private detailsService: DetailsService, private messageService: MessageService) { }
  ngOnChanges(): void {
    this.products = this.table_Data
  }

  ngOnInit(): void {
    this.cols = this.table_Columns
    this.products = this.table_Data
  }

  showArchitecture() {
    this.showDialog = true;
  }
  onClick(rowData: any) {
    console.log(rowData)
  }

  openDialog(rowData: any): void {
    this.data = rowData.IndustryType;
    const ref = this.dialogService.open(DialogComponent, {
      data: {
        rowData
      },
      header: `Project Information`,
      width: '50%'
    });
  }

  openDialog1(rowData: any, column: any,) {
    const ref = this.dialogService.open(DialogComponent, {
      data: {
        rowData
      },
      header: `Project Architecture`,
      width: '50%'
    });
  }

  openDialog2(rowData: any, column: any,) {
    const ref = this.dialogService.open(DialogComponent, {
      data: {
        rowData
      },
      header: `Project Edit History`,
      width: '50%'
    });
  }
  goToProjectInfo(data: any) {
    const projectId = data.projectId
    this.dataService.clickingMore.next(data)
    const userRole = JSON.parse(localStorage.getItem('Login') || '[]')?.userLogin?.role;
    if (userRole == "Project Manager") {
      this.router.navigate(['/dashboard/edit-existing-project/', projectId]);
    } else {
      this.router.navigate(['/dashboard/project-info/', projectId]);
    }
  }

  downloadImage(imageUrl: any) {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'image.jpg'; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  deleteRow(row: any) {
    const projectId = row.projectId
    this.detailsService.deleteTableRow(deleteQuery, projectId).subscribe(res => {
      this.response = res.data.deleteProject;
      if (this.response == true) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Table row deleted successfully' });
      }
    })
    window.location.reload();
  }

  openDialog3(rowData: any,): void {
    this.data = rowData.IndustryType;
    const ref = this.dialogService.open(DialogComponent, {
      data: {
        rowData
      },
      header: `Notes`,
      width: '50%'
    });
  }

}
