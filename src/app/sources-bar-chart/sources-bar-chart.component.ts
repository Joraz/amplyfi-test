import {
  Component,
  AfterViewInit,
  Input,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Chart } from 'chart.js';

import { ApiService } from '../api.service';
import { shuffleArray, getColors } from 'src/app/util';

@Component({
  selector: 'app-sources-bar-chart',
  template: `
    <div>
      <canvas #canvas width="400" height="400">{{ chart }}</canvas>
    </div>
  `,
})
export class SourcesBarChartComponent implements AfterViewInit, OnChanges {
  @Input() location: string;
  @ViewChild('canvas') canvas: ElementRef;

  public chart: Chart;

  constructor(private apiService: ApiService) {}

  public ngAfterViewInit(): void {
    this.apiService.getSources(this.location).subscribe(data => {
      data = shuffleArray(data);

      const ctx = (this.canvas.nativeElement as HTMLCanvasElement).getContext(
        '2d'
      );

      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.map(d => d._id.replace('source_', '')),
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
          title: { text: `Sources`, display: true },
          scales: {
            xAxes: [{ ticks: { autoSkip: false } }],
          },
        },
      });
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.location && this.chart) {
      this.apiService.getSources(this.location).subscribe(data => {
        data = shuffleArray(data);
        this.chart.data.datasets = [
          {
            data: data.map(d => d.count),
            backgroundColor: getColors(data.length),
          },
        ];
        this.chart.data.labels = data.map(d => d._id.replace('source_', ''));
        this.chart.update();
      });
    }
  }
}
