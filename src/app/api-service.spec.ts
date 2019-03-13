import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ApiService } from './api.service';
import {
  mockLocations,
  mockGenderStats,
  mockKeyWords,
  mockSources,
} from '../mocks/fixtures/api.fixtures';

describe('ApiServiceService', () => {
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: ApiService = TestBed.get(ApiService);
    expect(service).toBeTruthy();
  });

  it('getLocations() should call api endpoint', () => {
    const service: ApiService = TestBed.get(ApiService);
    service.getLocations().subscribe(locations => {
      expect(locations).toEqual(mockLocations);
    });

    const req = httpTestingController.expectOne('/api/location');
    req.flush(mockLocations);

    httpTestingController.verify();
  });

  it('getGenderStats() should call api endpoint', () => {
    const service: ApiService = TestBed.get(ApiService);
    service.getGenderStats('London').subscribe(genderStats => {
      expect(genderStats).toEqual(mockGenderStats);
    });

    const req = httpTestingController.expectOne('/api/location/London/gender');
    req.flush(mockGenderStats);

    httpTestingController.verify();
  });

  it('getKeywords() should call api endpoint', () => {
    const service: ApiService = TestBed.get(ApiService);
    service.getKeywords('London').subscribe(keywords => {
      expect(keywords).toEqual(mockKeyWords);
    });

    const req = httpTestingController.expectOne(
      '/api/location/London/keywords'
    );
    req.flush(mockKeyWords);

    httpTestingController.verify();
  });

  it('getSources() should call api endpoint', () => {
    const service: ApiService = TestBed.get(ApiService);
    service.getSources('London').subscribe(sources => {
      expect(sources).toEqual(mockSources);
    });

    const req = httpTestingController.expectOne('/api/location/London/sources');
    req.flush(mockSources);

    httpTestingController.verify();
  });
});
