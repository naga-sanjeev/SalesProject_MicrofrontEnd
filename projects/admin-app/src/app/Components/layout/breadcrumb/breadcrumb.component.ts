import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DataService } from '../../../Services/data.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  @Input() items: MenuItem[] = [];
  @Input() key: any
  home: any;
  menu2: any
  constructor(private dataService: DataService) { }
  items2 = []
  ngOnInit(): void {
    this.dataService.currentMessage.subscribe((message: any) => {
      this.menu2 = message;
    });

    // this.items = [
    //   { label: 'saikumar' },
    // ];
    // this.items = this.items.map((item: any) => ({ ...item, label: this.menu2 }));
    // this.home = { label: "Home", };
  }

}
