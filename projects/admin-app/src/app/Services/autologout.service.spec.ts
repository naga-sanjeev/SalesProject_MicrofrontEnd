import { TestBed } from '@angular/core/testing';

import { AutoLogoutService } from './autologout.service';

describe('AutologoutService', () => {
  let service: AutoLogoutService;
  // let checkSpy: jasmine.Spy<any>;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutoLogoutService);
    // checkSpy = spyOn(service, 'check');
  });
  afterEach(() => {
    // Clean up event listeners after each test
    document.body.removeEventListener('click', service.reset);
    document.body.removeEventListener('mouseover', service.reset);
    document.body.removeEventListener('mouseout', service.reset);
    document.body.removeEventListener('keydown', service.reset);
    document.body.removeEventListener('keyup', service.reset);
    document.body.removeEventListener('keypress', service.reset);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should set last action in local storage', () => {
    const setLastActionSpy = spyOn(service, 'setLastAction').and.callThrough();
    service.reset();
    expect(setLastActionSpy).toHaveBeenCalled();
    expect(setLastActionSpy).toHaveBeenCalledWith(jasmine.any(Number));
  });
  it('should add event listeners to document.body', () => {
    spyOn(document.body, 'addEventListener').and.callThrough();
    service.initListener();
    expect(document.body.addEventListener).toHaveBeenCalledTimes(6); 
  });
  it('should trigger reset method when events occur', () => {
    const eventTypes = ['click', 'mouseover', 'mouseout', 'keydown', 'keyup', 'keypress'];
    spyOn(service, 'reset');
    service.initListener();
    eventTypes.forEach(eventType => {
      const event = new MouseEvent(eventType);
      document.body.dispatchEvent(event);
    });
  });
  it('should call check method at specified interval', () => {
    jasmine.clock().install(); 
    const interval = 5000;
    service.initInterval();
    jasmine.clock().tick(interval); 
    jasmine.clock().uninstall();
  });
});
