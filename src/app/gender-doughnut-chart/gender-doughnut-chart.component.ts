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
import { getColors } from 'src/app/util';

@Component({
  selector: 'app-gender-doughnut-chart',
  template: `
    <div>
      <canvas #canvas width="400" height="400">{{ chart }}</canvas>
    </div>
  `,
})
export class GenderDoughnutChartComponent implements AfterViewInit, OnChanges {
  @Input() location: string;
  @ViewChild('canvas') canvas: ElementRef;

  public chart: Chart;

  constructor(private apiService: ApiService) {}

  public ngAfterViewInit(): void {
    this.apiService.getGenderStats(this.location).subscribe(data => {
      const ctx = (this.canvas.nativeElement as HTMLCanvasElement).getContext(
        '2d'
      );

      this.chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Male', 'Female'],
          datasets: [
            {
              data: [data.male, data.female],
              backgroundColor: getColors(3),
            },
          ],
        },
        options: {
          responsive: false,
          title: { text: `Gender split`, display: true },
        },
      });
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.location && this.chart) {
      this.apiService.getGenderStats(this.location).subscribe(data => {
        this.chart.data.datasets = [
          {
            data: [data.male, data.female],
            backgroundColor: getColors(2),
          },
        ];
        this.chart.update();
      });
    }
  }
}
