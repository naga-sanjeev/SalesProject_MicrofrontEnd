import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private messageSource = new BehaviorSubject<string>('');
  sidebarMessage = new BehaviorSubject<any>(true);
  private userName = new BehaviorSubject<any>('');
  clickingMore = new BehaviorSubject<any>('');
  currentMessage = this.messageSource.asObservable();
  currentMessage1 = this.sidebarMessage.asObservable();
  currentMessage2 = this.userName.asObservable();
  getProjectData = this.clickingMore.asObservable();
  mobileSideBar = new Subject<any>()
  mobileResponsive = new Subject<any>()
  currentMobileResponsive = this.mobileResponsive.asObservable();
  private responive = new BehaviorSubject<any>(true);
  currentMessage3 = this.mobileSideBar.asObservable();
  sideLinkValue = localStorage.getItem('Sidebar')
  private sideLink = new BehaviorSubject<any>(this.sideLinkValue)
  sideLinkResponse = this.sideLink.asObservable()
  private toastSource = new BehaviorSubject<string>('');
  toastMessagesuccess = this.toastSource.asObservable();
  passValues = new Subject<any>()
  passDropdownValues = this.passValues.asObservable()
  private inputDataSubject = new BehaviorSubject<string>('');
  inputData = this.inputDataSubject.asObservable();
  constructor() { }
  setInputData(data: string): void {
    this.inputDataSubject.next(data);
  }
  toastMessage(message: any) {
    console.log(message, "message")
    this.toastSource.next(message);
  }
  changeMessage(message: any) {
    console.log(message, "message")
    this.messageSource.next(message);
  }
  sidebarMenu(message: any) {
    console.log(message, "message")
    this.sidebarMessage.next(message);
  }
  user(message: any) {
    this.userName.next(message);
  }
  projectDetails(data: any) {
    this.clickingMore.next(data);
  }
  sidebarMenu2(message: any) {
    console.log(message, "message")
    this.mobileResponsive.next(message);
  }
  mobileSideMenu(message: any) {
    console.log(message);
    this.mobileSideBar.next(message)
  }
  sideBar(message: any) {
    console.log("sideLinkValue in service: ", this.sideLinkValue);
    console.log(message);
    this.sideLink.next(message)
    localStorage.setItem('Sidebar', JSON.stringify(message))
  }
  dropdownValues(message: any) {
    console.log(message);
    this.passValues.next(message)
  }
}
