import { Component, HostListener, OnInit } from '@angular/core';
import { DataService } from '../../../Services/data.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  menu2: any
  value: number = 80
  mobileView: any
  normalView: any
  mobileResponsive: boolean = false
  screenWidth: any;
  screenHeight: any;
  flexValue1: any
  flexValue2: any = '100'
  constructor(private dataService: DataService, private messageService: MessageService) { }
  ngOnInit(): void {
    this.dataService.toastMessagesuccess.subscribe(message => {
      if (message) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login Success' });
      }
    });

    this.dataService.currentMessage1.subscribe(message => {
      this.menu2 = message;
    });
    this.dataService.currentMobileResponsive.subscribe(message => {
      this.mobileResponsive = message;
      this.onResize(event)
    });
    this.dataService.currentMessage3.subscribe(message => {
      this.mobileResponsive = false
      this.onResize(event)
    })
    this.onResize(event)
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;

    if (window.innerWidth > 1400) {
      this.flexValue2 = 80;
      this.flexValue1 = 19;
      this.menu2 = true;
      this.mobileView = false
      this.normalView = true
      if (this.menu2 == true) {
        this.flexValue2 = 99
      }
    }
    else if (window.innerWidth >= 1300) {
      this.flexValue2 = 79;
      this.flexValue1 = 20;
      this.menu2 = true;
      this.mobileView = false
      this.normalView = true
      if (this.menu2 == true) {
        this.flexValue2 = 99
      }
    }
    else if (window.innerWidth >= 1200) {
      this.flexValue2 = 78;
      this.flexValue1 = 21
      this.menu2 = true;
      this.mobileView = false
      this.normalView = true
      if (this.menu2 == true) {
        this.flexValue2 = 99
      }
    }
    else if (window.innerWidth >= 1100) {
      this.flexValue2 = 77;
      this.flexValue1 = 22
      this.menu2 = true;
      this.mobileView = false
      this.normalView = true
      if (this.menu2 == true) {
        this.flexValue2 = 99
      }
    }
    else if (window.innerWidth >= 1000) {
      this.flexValue2 = 76;
      this.flexValue1 = 23
      this.menu2 = true;
      this.mobileView = false
      this.normalView = true
      if (this.menu2 == true) {
        this.flexValue2 = 99
      }
    } else if (window.innerWidth >= 900) {
      this.menu2 = false
      this.flexValue2 = 99
      this.mobileView = true
      this.normalView = false
      if (this.mobileResponsive == true) {
        this.flexValue1 = 49
        this.flexValue2 = 50
      }
    }
    else if (window.innerWidth >= 800) {
      this.menu2 = false
      this.flexValue2 = 99
      this.mobileView = true
      this.normalView = false
      if (this.mobileResponsive == true) {
        this.flexValue1 = 49
        this.flexValue2 = 50
      }
    }
    else if (window.innerWidth >= 700) {
      this.menu2 = false
      this.flexValue2 = 99
      this.mobileView = true
      this.normalView = false
      if (this.mobileResponsive == true) {
        this.flexValue1 = 54
        this.flexValue2 = 45
      }
    }
    else if (window.innerWidth >= 600) {
      this.menu2 = false
      this.flexValue2 = 99
      this.mobileView = true
      this.normalView = false
      if (this.mobileResponsive == true) {
        this.flexValue1 = 59
        this.flexValue2 = 40
      }
    }
    else if (window.innerWidth >= 500) {
      this.menu2 = false
      this.flexValue2 = 99
      this.mobileView = true
      this.normalView = false
      if (this.mobileResponsive == true) {
        this.flexValue1 = 59
        this.flexValue2 = 40
      }
    }
    else if (window.innerWidth >= 400) {
      this.menu2 = false
      this.flexValue2 = 99
      this.mobileView = true
      this.normalView = false
      if (this.mobileResponsive == true) {
        this.flexValue1 = 59
        this.flexValue2 = 40
      }
    }
    else if (window.innerWidth >= 300) {
      this.menu2 = false
      this.flexValue2 = 99
      this.mobileView = true
      this.normalView = false
      if (this.mobileResponsive == true) {
        this.flexValue1 = 59
        this.flexValue2 = 40
      }
    }
  }
}
