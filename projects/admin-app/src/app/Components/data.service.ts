import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private messageSource = new BehaviorSubject<string>(''); 
  private sidebarMessage = new BehaviorSubject<any>(true);
  private responive = new BehaviorSubject<any>(true);
  private mobileResponsive=new Subject<any>()
  private mobileSideBar=new Subject<any>()
  currentMessage = this.messageSource.asObservable();
  currentMessage1 = this.sidebarMessage.asObservable();
  currentMessage2 = this.mobileResponsive.asObservable();
  currentMessage3 = this.mobileSideBar.asObservable();
  constructor() { }
  changeMessage(message: any) {
    console.log(message,"message")
    this.messageSource.next(message);
  }
  sidebarMenu(message: any) {
    console.log(message,"message")
    this.sidebarMessage.next(message);
  }
  sidebarMenu2(message:any){
    console.log(message,"message")
    this.mobileResponsive.next(message);
  }
  mobileSideMenu(message:any){
    console.log(message);
    this.mobileSideBar.next(message)
  }
}
