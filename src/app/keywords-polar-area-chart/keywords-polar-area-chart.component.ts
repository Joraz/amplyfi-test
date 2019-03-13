import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Chart } from 'chart.js';

import { ApiService } from '../api.service';
import { getColors, shuffleArray } from 'src/app/util';

@Component({
  selector: 'app-keywords-polar-area-chart',
  template: `
    <div>
      <canvas #canvas width="400" height="400">{{ chart }}</canvas>
    </div>
  `,
})
export class KeywordsPolarAreaChartComponent
  implements AfterViewInit, OnChanges {
  @Input() location: string;
  @ViewChild('canvas') keywordsCanvas: ElementRef;

  public chart: Chart;

  constructor(private apiService: ApiService) {}

  public ngAfterViewInit(): void {
    this.apiService.getKeywords(this.location).subscribe(data => {
      data = shuffleArray(data);

      const ctx = (this.keywordsCanvas
        .nativeElement as HTMLCanvasElement).getContext('2d');
      this.chart = new Chart(ctx, {
        type: 'polarArea',
        data: {
          labels: data.map(d => d._id),
          datasets: [
            {
              data: data.map(d => d.count),
              backgroundColor: getColors(data.length),
            },
          ],
        },
        options: {
          responsive: false,
          legend: { display: false },
          title: { text: `Keywords`, display: true },
        },
      });
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.location && this.chart) {
      this.apiService.getKeywords(this.location).subscribe(data => {
        data = shuffleArray(data);
        this.chart.data.datasets = [
          {
            data: data.map(d => d.count),
            backgroundColor: getColors(data.length),
          },
        ];
        this.chart.data.labels = data.map(d => d._id);
        this.chart.update();
      });
    }
  }
}
