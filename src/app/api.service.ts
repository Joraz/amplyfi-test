import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GenderStats {
  male: number;
  female: number;
  unixsex: number;
  unknown: number;
}

export interface DataSet {
  _id: string;
  count: number;
}
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private $http: HttpClient) {}

  public getLocations(): Observable<string[]> {
    return this.$http.get<string[]>('/api/location');
  }

  public getGenderStats(location: string): Observable<GenderStats> {
    return this.$http.get<GenderStats>(`/api/location/${location}/gender`);
  }

  public getKeywords(location: string): Observable<DataSet[]> {
    return this.$http.get<DataSet[]>(`/api/location/${location}/keywords`);
  }

  public getSources(location: string): Observable<DataSet[]> {
    return this.$http.get<DataSet[]>(`/api/location/${location}/sources`);
  }
}
