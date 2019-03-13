import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { GenderDoughnutChartComponent } from './gender-doughnut-chart/gender-doughnut-chart.component';
import { KeywordsPolarAreaChartComponent } from './keywords-polar-area-chart/keywords-polar-area-chart.component';
import { SourcesBarChartComponent } from './sources-bar-chart/sources-bar-chart.component';
import { LocationSelectorComponent } from './location-selector/location-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    GenderDoughnutChartComponent,
    KeywordsPolarAreaChartComponent,
    SourcesBarChartComponent,
    LocationSelectorComponent,
  ],
  imports: [BrowserModule, HttpClientModule, CommonModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
