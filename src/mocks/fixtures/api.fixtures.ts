import { GenderStats, DataSet } from 'src/app/api.service';

export const mockLocations: string[] = ['London', 'Madrid', 'Rome'];

export const mockGenderStats: GenderStats = {
  female: 22,
  male: 12,
  unixsex: 2,
  unknown: 0,
};

export const mockKeyWords: DataSet[] = [
  {
    _id: 'Plug-in Hybrid',
    count: 23,
  },
  {
    _id: 'Charging point',
    count: 11,
  },
  {
    _id: 'Fossil fuels',
    count: 3,
  },
];

export const mockSources: DataSet[] = [
  {
    _id: 'search engine',
    count: 35,
  },
  {
    _id: 'newspaper',
    count: 17,
  },
];
