import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderDoughnutChartComponent } from './gender-doughnut-chart.component';
import { ApiService } from '../api.service';
import { MockApiService } from 'src/mocks/api.service.mock';

describe('GenderDoughnutChartComponent', () => {
  let component: GenderDoughnutChartComponent;
  let fixture: ComponentFixture<GenderDoughnutChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GenderDoughnutChartComponent],
      providers: [{ provide: ApiService, useClass: MockApiService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenderDoughnutChartComponent);
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
