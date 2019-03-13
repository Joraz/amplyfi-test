import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../api.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-location-selector',
  templateUrl: './location-selector.component.html',
  styleUrls: ['./location-selector.component.css'],
})
export class LocationSelectorComponent implements OnInit {
  @Output() locationSelected = new EventEmitter<string>();

  public locationForm: FormControl;
  public locations: string[];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getLocations().subscribe(locations => {
      this.locations = locations;
      this.locationForm = new FormControl();

      this.locationForm.valueChanges.subscribe(value => {
        this.locationSelected.emit(value);
      });
    });
  }
}
