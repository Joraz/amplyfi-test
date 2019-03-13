import { Observable, of as observableOf } from 'rxjs';

import { DataSet, GenderStats } from 'src/app/api.service';
import {
  mockGenderStats,
  mockLocations,
  mockKeyWords,
  mockSources,
} from './fixtures/api.fixtures';

export class MockApiService {
  public getLocations(): Observable<string[]> {
    return observableOf(mockLocations);
  }

  public getGenderStats(location: string): Observable<GenderStats> {
    return observableOf<GenderStats>(mockGenderStats);
  }

  public getKeywords(location: string): Observable<DataSet[]> {
    return observableOf<DataSet[]>(mockKeyWords);
  }

  public getSources(location: string): Observable<DataSet[]> {
    return observableOf<DataSet[]>(mockSources);
  }
}
