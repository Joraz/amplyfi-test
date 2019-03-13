import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourcesBarChartComponent } from './sources-bar-chart.component';
import { ApiService } from '../api.service';
import { MockApiService } from '../../mocks/api.service.mock';

describe('SourcesBarChartComponent', () => {
  let component: SourcesBarChartComponent;
  let fixture: ComponentFixture<SourcesBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SourcesBarChartComponent],
      providers: [{ provide: ApiService, useClass: MockApiService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourcesBarChartComponent);
    component = fixture.componentInstance;
    component.ngAfterViewInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create chart', () => {
    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelector('canvas')).toBeTruthy();
  });
});
