import { DeltaType } from '@tremor/react';
import { proxy } from 'valtio';

export type DashboardStore = {
  selectedKpi: string;
  startDate: Date;
  endDate: Date;
  selectedTab: 'overview' | 'detail' | 'charts' | 'flowchart';
  selectedNames: string[];
  selectedStatus: string;
};

export type SalesPerson = {
  name: string;
  leads: number;
  sales: string;
  quota: string;
  variance: string;
  region: string;
  status: string;
  deltaType: DeltaType;
};

export const performanceData = [
  {
    date: '2021-01-01',
    Sales: 900.73,
    Profit: 173,
    Customers: 73,
  },
  {
    date: '2021-01-02',
    Sales: 1000.74,
    Profit: 174.6,
    Customers: 74,
  },
  {
    date: '2021-01-03',
    Sales: 1100.93,
    Profit: 293.1,
    Customers: 293,
  },
  {
    date: '2021-01-04',
    Sales: 1200.9,
    Profit: 290.2,
    Customers: 29,
  },
  {
    date: '2021-01-05',
    Sales: 1200.98,
    Profit: 298,
    Customers: 98,
  },
  {
    date: '2021-01-06',
    Sales: 1300,
    Profit: 300,
    Customers: 30,
  },
  {
    date: '2021-01-07',
    Sales: 1300.96,
    Profit: 396.5,
    Customers: 396,
  },
  {
    date: '2021-01-08',
    Sales: 1200.05,
    Profit: 205.3,
    Customers: 205,
  },
  {
    date: '2021-01-09',
    Sales: 1100.98,
    Profit: 198.5,
    Customers: 398,
  },
  {
    date: '2021-01-10',
    Sales: 1100.7,
    Profit: 270,
    Customers: 47,
  },
  {
    date: '2021-01-11',
    Sales: 1100.57,
    Profit: 357,
    Customers: 357,
  },
  {
    date: '2021-01-12',
    Sales: 1100.66,
    Profit: 166,
    Customers: 166,
  },
  {
    date: '2021-01-13',
    Sales: 1200.1,
    Profit: 210,
    Customers: 21,
  },
  {
    date: '2021-01-14',
    Sales: 1300.27,
    Profit: 227,
    Customers: 227,
  },
  {
    date: '2021-01-15',
    Sales: 1400.15,
    Profit: 215,
    Customers: 215,
  },
  {
    date: '2021-01-16',
    Sales: 1320.08,
    Profit: 208,
    Customers: 208,
  },
  {
    date: '2021-01-17',
    Sales: 1240.03,
    Profit: 203,
    Customers: 303,
  },
  {
    date: '2021-01-18',
    Sales: 1200.98,
    Profit: 298,
    Customers: 498,
  },
  {
    date: '2021-01-19',
    Sales: 1200.08,
    Profit: 208,
    Customers: 408,
  },
  {
    date: '2021-01-20',
    Sales: 1200.04,
    Profit: 204,
    Customers: 401,
  },
  {
    date: '2021-01-21',
    Sales: 1000.04,
    Profit: 304,
    Customers: 350,
  },
  {
    date: '2021-01-22',
    Sales: 800.96,
    Profit: 301,
    Customers: 496,
  },
  {
    date: '2021-01-23',
    Sales: 700.96,
    Profit: 291,
    Customers: 596,
  },
  {
    date: '2021-01-24',
    Sales: 600.93,
    Profit: 293,
    Customers: 593,
  },
  {
    date: '2021-01-25',
    Sales: 500.88,
    Profit: 388,
    Customers: 588,
  },
  {
    date: '2021-01-26',
    Sales: 400.79,
    Profit: 479,
    Customers: 579,
  },
  {
    date: '2021-01-27',
    Sales: 300.77,
    Profit: 377.4,
    Customers: 677,
  },
  {
    date: '2021-01-28',
    Sales: 740,
    Profit: 374,
    Customers: 674,
  },
  {
    date: '2021-01-29',
    Sales: 750,
    Profit: 174,
    Customers: 774,
  },
  {
    date: '2021-01-30',
    Sales: 770,
    Profit: 377,
    Customers: 877,
  },
  {
    date: '2021-01-31',
    Sales: 790,
    Profit: 279,
    Customers: 679,
  },
  {
    date: '2021-02-01',
    Sales: 681,
    Profit: 681,
    Customers: 581,
  },
  {
    date: '2021-02-02',
    Sales: 784,
    Profit: 784,
    Customers: 484,
  },
  {
    date: '2021-02-03',
    Sales: 877,
    Profit: 877,
    Customers: 377,
  },
  {
    date: '2021-02-04',
    Sales: 1078,
    Profit: 978,
    Customers: 278,
  },
  {
    date: '2021-02-05',
    Sales: 978,
    Profit: 778,
    Customers: 278,
  },
  {
    date: '2021-02-06',
    Sales: 982,
    Profit: 682,
    Customers: 282,
  },
  {
    date: '2021-02-07',
    Sales: 1082,
    Profit: 582,
    Customers: 282,
  },
  {
    date: '2021-02-08',
    Sales: 1077,
    Profit: 577,
    Customers: 177,
  },
  {
    date: '2021-02-09',
    Sales: 1076,
    Profit: 476,
    Customers: 276,
  },
  {
    date: '2021-02-10',
    Sales: 775,
    Profit: 475,
    Customers: 375,
  },
  {
    date: '2021-02-11',
    Sales: 762,
    Profit: 362,
    Customers: 362,
  },
  {
    date: '2021-02-12',
    Sales: 756,
    Profit: 256,
    Customers: 156,
  },
  {
    date: '2021-02-13',
    Sales: 850,
    Profit: 153,
    Customers: 51,
  },
  {
    date: '2021-02-14',
    Sales: 846,
    Profit: 461,
    Customers: 46,
  },
  {
    date: '2021-02-15',
    Sales: 943,
    Profit: 435.7,
    Customers: 43,
  },
  {
    date: '2021-02-16',
    Sales: 104,
    Profit: 423.9,
    Customers: 41,
  },
  {
    date: '2021-02-17',
    Sales: 1037,
    Profit: 137,
    Customers: 37,
  },
  {
    date: '2021-02-18',
    Sales: 1134,
    Profit: 134,
    Customers: 434,
  },
  {
    date: '2021-02-19',
    Sales: 1232,
    Profit: 232.8,
    Customers: 53,
  },
  {
    date: '2021-02-20',
    Sales: 1333,
    Profit: 333,
    Customers: 133,
  },
  {
    date: '2021-02-21',
    Sales: 1431,
    Profit: 431,
    Customers: 310,
  },
  {
    date: '2021-02-22',
    Sales: 1429,
    Profit: 429,
    Customers: 429,
  },
  {
    date: '2021-02-23',
    Sales: 721,
    Profit: 321,
    Customers: 321,
  },
  {
    date: '2021-02-24',
    Sales: 547,
    Profit: 347,
    Customers: 347,
  },
  {
    date: '2021-02-25',
    Sales: 386,
    Profit: 286,
    Customers: 286,
  },
  {
    date: '2021-02-26',
    Sales: 110,
    Profit: 111,
    Customers: 110,
  },
  {
    date: '2021-02-27',
    Sales: 227,
    Profit: 227,
    Customers: 427,
  },
  {
    date: '2021-02-28',
    Sales: 526,
    Profit: 326,
    Customers: 426,
  },
  {
    date: '2021-03-01',
    Sales: 726,
    Profit: 426.8,
    Customers: 526,
  },
  {
    date: '2021-03-02',
    Sales: 925,
    Profit: 525.6,
    Customers: 425,
  },
  {
    date: '2021-03-03',
    Sales: 101,
    Profit: 610.2,
    Customers: 410,
  },
  {
    date: '2021-03-04',
    Sales: 525,
    Profit: 725,
    Customers: 425,
  },
  {
    date: '2021-03-05',
    Sales: 122,
    Profit: 422,
    Customers: 422,
  },
  {
    date: '2021-03-06',
    Sales: 200,
    Profit: 223,
    Customers: 420,
  },
  {
    date: '2021-03-07',
    Sales: 417,
    Profit: 217,
    Customers: 517,
  },
  {
    date: '2021-03-08',
    Sales: 516,
    Profit: 316,
    Customers: 516,
  },
  {
    date: '2021-03-09',
    Sales: 913,
    Profit: 413,
    Customers: 513,
  },
  {
    date: '2021-03-10',
    Sales: 807,
    Profit: 407,
    Customers: 507,
  },
  {
    date: '2021-03-11',
    Sales: 803,
    Profit: 503.7,
    Customers: 603,
  },
  {
    date: '2021-03-12',
    Sales: 892,
    Profit: 692,
    Customers: 692,
  },
  {
    date: '2021-03-13',
    Sales: 882,
    Profit: 682,
    Customers: 682,
  },
];

export const salesPeople: SalesPerson[] = [
  {
    name: 'Peter Doe',
    leads: 45,
    sales: '1,000,000',
    quota: '1,200,000',
    variance: 'low',
    region: 'Region A',
    status: 'overperforming',
    deltaType: 'moderateIncrease',
  },
  {
    name: 'Lena Whitehouse',
    leads: 35,
    sales: '900,000',
    quota: '1,000,000',
    variance: 'low',
    region: 'Region B',
    status: 'average',
    deltaType: 'unchanged',
  },
  {
    name: 'Phil Less',
    leads: 52,
    sales: '930,000',
    quota: '1,000,000',
    variance: 'medium',
    region: 'Region C',
    status: 'underperforming',
    deltaType: 'moderateDecrease',
  },
  {
    name: 'John Camper',
    leads: 22,
    sales: '390,000',
    quota: '250,000',
    variance: 'low',
    region: 'Region A',
    status: 'overperforming',
    deltaType: 'increase',
  },
  {
    name: 'Max Balmoore',
    leads: 49,
    sales: '860,000',
    quota: '750,000',
    variance: 'low',
    region: 'Region B',
    status: 'overperforming',
    deltaType: 'increase',
  },
  {
    name: 'Peter Moore',
    leads: 82,
    sales: '1,460,000',
    quota: '1,500,000',
    variance: 'low',
    region: 'Region A',
    status: 'average',
    deltaType: 'unchanged',
  },
  {
    name: 'Joe Sachs',
    leads: 49,
    sales: '1,230,000',
    quota: '1,800,000',
    variance: 'medium',
    region: 'Region B',
    status: 'underperforming',
    deltaType: 'moderateDecrease',
  },
];

const minDate = new Date(performanceData[0].date);
const maxDate = new Date(performanceData[performanceData.length - 1].date);

type Kpi = {
  title: string;
  metric: string;
  progress: number;
  target: string;
  delta: string;
  deltaType: DeltaType;
};

export const kpiData: Kpi[] = [
  {
    title: 'Sales',
    metric: '$ 12,699',
    progress: 15.9,
    target: '$ 80,000',
    delta: '13.2%',
    deltaType: 'moderateIncrease',
  },
  {
    title: 'Profit',
    metric: '$ 45,564',
    progress: 36.5,
    target: '$ 125,000',
    delta: '23.9%',
    deltaType: 'increase',
  },
  {
    title: 'Customers',
    metric: '1,072',
    progress: 53.6,
    target: '2,000',
    delta: '10.1%',
    deltaType: 'moderateDecrease',
  },
];

export const dashboardStore = proxy<DashboardStore>({
  selectedKpi: 'Sales',
  selectedStatus: 'all',
  selectedNames: [],
  selectedTab: 'overview',
  startDate: minDate,
  endDate: maxDate,
});
