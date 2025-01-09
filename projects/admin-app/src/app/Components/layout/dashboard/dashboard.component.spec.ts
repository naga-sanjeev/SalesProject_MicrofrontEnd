import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { MessageService } from 'primeng/api';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [MessageService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call onResize when window width greater than 1400', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(1500);
    component.onResize(null);
    expect(component.flexValue2).toBe(99);
    expect(component.menu2).toBe(true);
    expect(component.mobileView).toBe(false);
    expect(component.normalView).toBe(true);
  });

  it('should call onResize when window width greater than 1300', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(1350);
    component.onResize(null);
    expect(component.flexValue2).toBe(99);
    expect(component.menu2).toBe(true);
    expect(component.mobileView).toBe(false);
    expect(component.normalView).toBe(true);
  });
  it('should call onResize when window width greater than 1200', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(1250);
    component.onResize(null);
    expect(component.flexValue2).toBe(99);
    expect(component.menu2).toBe(true);
    expect(component.mobileView).toBe(false);
    expect(component.normalView).toBe(true);
  });
  it('should call onResize when window width greater than 1100', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(1150);
    component.onResize(null);
    expect(component.flexValue2).toBe(99);
    expect(component.menu2).toBe(true);
    expect(component.mobileView).toBe(false);
    expect(component.normalView).toBe(true);
  });
  it('should call onResize when window width greater than 900', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(950);
    component.onResize(null);
    expect(component.flexValue2).toBe(99);
    expect(component.menu2).toBe(false);
    expect(component.mobileView).toBe(true);
    expect(component.normalView).toBe(false);
  });
  it('should call onResize when window width greater than 800', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(850);
    component.onResize(null);
    expect(component.flexValue2).toBe(99);
    expect(component.menu2).toBe(false);
    expect(component.mobileView).toBe(true);
    expect(component.normalView).toBe(false);
  });
  it('should call onResize when window width greater than 700', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(750);
    component.onResize(null);
    expect(component.flexValue2).toBe(99);
    expect(component.menu2).toBe(false);
    expect(component.mobileView).toBe(true);
    expect(component.normalView).toBe(false);
  });
  it('should call onResize when window width greater than 600', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(650);
    component.onResize(null);
    expect(component.flexValue2).toBe(99);
    expect(component.menu2).toBe(false);
    expect(component.mobileView).toBe(true);
    expect(component.normalView).toBe(false);
  });
  it('should call onResize when window width greater than 500', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(550);
    component.onResize(null);
    expect(component.flexValue2).toBe(99);
    expect(component.menu2).toBe(false);
    expect(component.mobileView).toBe(true);
    expect(component.normalView).toBe(false);
  });
  it('should call onResize when window width greater than 400', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(450);
    component.onResize(null);
    expect(component.flexValue2).toBe(99);
    expect(component.menu2).toBe(false);
    expect(component.mobileView).toBe(true);
    expect(component.normalView).toBe(false);
  });
  it('should call onResize when window width greater than 300', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(350);
    component.onResize(null);
    expect(component.menu2).toBe(false);
    expect(component.mobileView).toBe(true);
    expect(component.normalView).toBe(false);
  });
});
