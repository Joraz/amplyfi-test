import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationSelectorComponent } from './location-selector.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../api.service';
import { MockApiService } from '../../mocks/api.service.mock';

describe('LocationSelectorComponent', () => {
  let component: LocationSelectorComponent;
  let fixture: ComponentFixture<LocationSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],
      declarations: [LocationSelectorComponent],
      providers: [{ provide: ApiService, useClass: MockApiService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a dropdown with options', () => {
    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelector('select')).toBeDefined();
    const values = element.querySelectorAll('option');
    expect(values.item(1).text).toEqual('London');
    expect(values.item(2).text).toEqual('Madrid');
    expect(values.item(3).text).toEqual('Rome');
  });

  it('should emit when form value changes', done => {
    component.locationSelected.subscribe((value: string) => {
      expect(value).toEqual('London');
      done();
    });

    component.locationForm.setValue('London');
  });
});
