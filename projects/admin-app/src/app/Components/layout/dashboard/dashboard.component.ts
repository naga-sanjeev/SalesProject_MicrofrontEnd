import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../data.service';
import { windowCount } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  mobileView:any
  normalView:any
  menu2: any
  mobileResponsive:boolean=false
  screenWidth: any;
  screenHeight: any;
  flexValue1: any
  flexValue2: any='100'
  constructor(private dataService: DataService) { }
  ngOnInit(): void {
    this.dataService.currentMessage1.subscribe(message => {
      console.log("sidenav", message)
      this.menu2 = message;
    });
    this.dataService.currentMessage2.subscribe(message => {
      console.log("mobileResponsive", message)
      this.mobileResponsive = message;
      this.onResize(event)
    });
    this.dataService.currentMessage3.subscribe(message=>{
      console.log("side menu selected");
      this.mobileResponsive=false
      this.onResize(event)
    })
    this.onResize(event)
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;

    if (window.innerWidth > 1400) {
      // this.flexValue2 = 80;
      this.flexValue1 = 19
      console.log(this.flexValue2);
      console.log(this.menu2);
      this.menu2 = true;
      this.mobileView=false
      this.normalView=true
    }
    else if (window.innerWidth >= 1300) {
      // this.flexValue2 = 79;
      this.flexValue1 = 20
      console.log(this.flexValue2);
      console.log(this.menu2);
      this.menu2 = true;
      this.mobileView=false
      this.normalView=true
    }
    else if (window.innerWidth >= 1200) {
      // this.flexValue2 = 78;
      this.flexValue1 = 21
      console.log(this.flexValue2);
      console.log(this.menu2);
      this.menu2 = true;
      this.mobileView=false
      this.normalView=true
    }
    else if (window.innerWidth >= 1100) {
      // this.flexValue2 = 77;
      this.flexValue1 = 22
      console.log(this.flexValue2);
      console.log(this.menu2);
      this.menu2 = true;
      this.mobileView=false
      this.normalView=true
    }
    else if (window.innerWidth >= 1000) {
      // this.flexValue2 = 76;
      this.flexValue1 = 23
      console.log(this.flexValue2);
      console.log(this.menu2);
      this.menu2 = true;
      this.mobileView=false
      this.normalView=true
    } else if (window.innerWidth >= 900){
      this.menu2 = false
      this.flexValue2 = 99
      console.log(this.flexValue2);
      console.log(this.menu2);
      this.mobileView=true
      this.normalView=false
      if(this.mobileResponsive==true){
        this.flexValue1=39
        this.flexValue2=60
      }
    }
    else if (window.innerWidth >= 800){
      this.menu2 = false
      this.flexValue2 = 99
      console.log(this.flexValue2);
      console.log(this.menu2);
      this.mobileView=true
      this.normalView=false
      if(this.mobileResponsive==true){
        this.flexValue1=49
        this.flexValue2=50
      }
    }
    else if (window.innerWidth >= 700){
      this.menu2 = false
      this.flexValue2 = 99
      console.log(this.flexValue2);
      console.log(this.menu2);
      this.mobileView=true
      this.normalView=false
      if(this.mobileResponsive==true){
        this.flexValue1=54
        this.flexValue2=45
      }
    }
    else if (window.innerWidth >= 600){
      this.menu2 = false
      this.flexValue2 = 99
      console.log(this.flexValue2);
      console.log(this.menu2);
      this.mobileView=true
      this.normalView=false
      if(this.mobileResponsive==true){
        this.flexValue1=59
        this.flexValue2=40
      }
    }
    else if (window.innerWidth >= 500){
      this.menu2 = false
      this.flexValue2 = 99
      console.log(this.flexValue2);
      console.log(this.menu2);
      this.mobileView=true
      this.normalView=false
      if(this.mobileResponsive==true){
        this.flexValue1=59
        this.flexValue2=40
      }
    }
    else if (window.innerWidth >= 400){
      this.menu2 = false
      this.flexValue2 = 99
      console.log(this.flexValue2);
      console.log(this.menu2);
      this.mobileView=true
      this.normalView=false
      if(this.mobileResponsive==true){
        this.flexValue1=59
        this.flexValue2=40
      }
    }
    else if (window.innerWidth >= 300){
      this.menu2 = false
      this.flexValue2 = 99
      console.log(this.flexValue2);
      console.log(this.menu2);
      this.mobileView=true
      this.normalView=false
      if(this.mobileResponsive==true){
        this.flexValue1=59
        this.flexValue2=40
      }
    }

  }
}
