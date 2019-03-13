import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordsPolarAreaChartComponent } from './keywords-polar-area-chart.component';
import { ApiService } from '../api.service';
import { MockApiService } from 'src/mocks/api.service.mock';

describe('KeywordsPolarAreaChartComponent', () => {
  let component: KeywordsPolarAreaChartComponent;
  let fixture: ComponentFixture<KeywordsPolarAreaChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KeywordsPolarAreaChartComponent],
      providers: [{ provide: ApiService, useClass: MockApiService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeywordsPolarAreaChartComponent);
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
