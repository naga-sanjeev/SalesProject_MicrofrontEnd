import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoCompleteComponent } from './auto-complete.component';

describe('AutoCompleteComponent', () => {
  let component: AutoCompleteComponent;
  let fixture: ComponentFixture<AutoCompleteComponent>;
  let event: { query: any };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoCompleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    event = { query: '' };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should return all values when search query is empty', () => {
    component.allValues = [
      { label: 'AMC' },
      { label: 'AMCI' },
      { label: 'Doppler' }
    ];
    component.search(event);
    expect(component.filteredValues.length).toBe(3);
  });
  it('should call onOptionSelect', () => {
    component.onOptionSelect(event);
  });
});
