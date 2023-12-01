import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { CsvService } from 'src/app/Utils/csv.service';
import * as Papa from 'papaparse';
@Component({
  selector: 'app-bivariant',
  templateUrl: './bivariant.component.html',
  styleUrls: ['./bivariant.component.scss']
})
export class BivariantComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [];
  mean: number | undefined;
  median: number | undefined;
  range: number | undefined;
  interquartileRange: number | undefined;
  variance: number | undefined;
  standardDeviation: number | undefined;
  skewness: number | undefined;
  kurtosis: number | undefined;
  outliers: number[] = [];
  modality: string = '';
  shapeInfo: string = '';
  userThreshold: number = 50;
  userCutpoint: number = 25;
  thresholdInfo: string = '';
  data:number[] = []



  // chartData: any[] = [];
  // constructor(private csvService: CsvService) { }
  // chartOptions = {
  //   responsive: true,
  //   scales: {
  //     x: {
  //       type: 'linear',
  //       position: 'bottom',
  //     },
  //     y: {
  //       type: 'linear',
  //       position: 'left',
  //     },
  //   },
  constructor(){};

  ngOnInit(): void {
    // this.loadData();
    Papa.parse('assets/data.csv', {
      header: true,
      download: true,
      complete: (result) => {
        // Assuming your CSV has a column named 'value' for analysis
        const values = result.data.map((row: any) => parseFloat(row.value));

        // Perform your analysis on 'values' array
        this.computeAnalysis([2,3,3,4,5,6,7,8,9,0,100,3,2]);
        this.data = values
      }
    });

  }
  
  private computeAnalysis(data: number[]): void {
    // Implement your analysis logic here
    // Example: Compute mean, median, etc.

    // Update chart data
    this.mean = this.calculateMean(data);
    this.median = this.calculateMedian(data);
    this.range = this.calculateRange(data);
    this.interquartileRange = this.calculateInterquartileRange(data);
    this.variance = this.calculateVariance(data);
    this.standardDeviation = this.calculateStandardDeviation(data);
    this.skewness = this.calculateSkewness(data);
    this.kurtosis = this.calculateKurtosis(data);
    this.outliers = this.identifyOutliers(data);
    this.modality = this.determineModality(data);
    this.shapeInfo = this.analyzeShape(data);
    this.userThreshold = this.defineUserThreshold();
    this.userCutpoint = this.defineUserCutpoint();
    this.thresholdInfo = this.analyzeThresholds(data);

    this.barChartData = [
      { data: data, label: 'Analysis' }
    ];
  }
  private defineUserThreshold(): number {
    // You can define your logic to set user-defined threshold
    // For example, return the mean + 2 * standard deviation
    return this.calculateMean(this.data) + 2 * this.calculateStandardDeviation(this.data);
  }

  private defineUserCutpoint(): number  {
    // You can define your logic to set user-defined cutpoint
    // For example, return the 75th percentile
    const sortedData = [...this.data].sort((a, b) => a - b);
    return this.calculatePercentile(sortedData, 0.75);
  }

  private analyzeThresholds(data: number[]): string {
    if (this.userThreshold === undefined || this.userCutpoint === undefined) {
      return 'Define user threshold and cutpoint first.';
    }

    const aboveThreshold = data.filter(value => value > this.userThreshold);
    const belowCutpoint = data.filter(value => value < this.userCutpoint);

    return `Values above user-defined threshold (${this.userThreshold}): ${aboveThreshold.length}, 
            Values below user-defined cutpoint (${this.userCutpoint}): ${belowCutpoint.length}`;
  }
  private calculateRange(data: number[]): number {
    return Math.max(...data) - Math.min(...data);
  }
  private analyzeShape(data: number[]): string {
    const mean = this.calculateMean(data);

    // Assess symmetry
    const skewness = this.calculateSkewness(data);
    const symmetricThreshold = 0.1; // You can adjust this threshold based on your criteria

    if (Math.abs(skewness) < symmetricThreshold) {
      return 'Symmetric';
    } else if (skewness < 0) {
      return 'Negatively Skewed';
    } else {
      return 'Positively Skewed';
    }
  }
  private calculateInterquartileRange(data: number[]): number {
    const sortedData = [...data].sort((a, b) => a - b);
    const q1 = this.calculatePercentile(sortedData, 0.25);
    const q3 = this.calculatePercentile(sortedData, 0.75);
    return q3 - q1;
  }

  private calculateVariance(data: number[]): number {
    const mean = this.calculateMean(data);
    return data.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / data.length;
  }

  private calculateStandardDeviation(data: number[]): number {
    return Math.sqrt(this.calculateVariance(data));
  }
  private determineModality(data: number[]): string {
    const sortedData = [...data].sort((a, b) => a - b);

    // Count the number of peaks (modes) in the distribution
    const peaks = sortedData.reduce((count, value, index, array) => {
      if (index > 0 && index < array.length - 1) {
        if (value > array[index - 1] && value > array[index + 1]) {
          count++;
        }
      }
      return count;
    }, 0);

    if (peaks === 0) {
      return 'Unimodal';
    } else if (peaks === 1) {
      return 'Bimodal';
    } else {
      return 'Multimodal';
    }
  }
  private calculatePercentile(sortedData: number[], percentile: number): number {
    const index = (percentile * (sortedData.length - 1));
    const lower = Math.floor(index);
    const upper = Math.ceil(index);

    if (lower === upper) {
      return sortedData[lower];
    } else {
      const fraction = index - lower;
      return sortedData[lower] * (1 - fraction) + sortedData[upper] * fraction;
    }
  }

  private calculateMean(data: number[]): number {
    return data.reduce((sum, value) => sum + value, 0) / data.length;
  }

  private calculateMedian(data: number[]): number {
    const sortedData = [...data].sort((a, b) => a - b);
    const middle = Math.floor(sortedData.length / 2);

    if (sortedData.length % 2 === 0) {
      return (sortedData[middle - 1] + sortedData[middle]) / 2;
    } else {
      return sortedData[middle];
    }
  }
  // async loadData() {
  //   const filePath = 'assets/sampleData.csv'
  //   const rawData = await this.csvService.readLocalFile(filePath);
  //   this.chartData = this.csvService.parseCsvForBivariateAnalysis(rawData);
  //   // Process your data if needed// }
  private calculateSkewness(data: number[]): number {
    const mean = this.calculateMean(data);
    const variance = this.calculateVariance(data);
    const standardDeviation = Math.sqrt(variance);

    const numerator = data.reduce((sum, value) => sum + Math.pow(value - mean, 3), 0);
    return (numerator / (data.length * Math.pow(standardDeviation, 3)));
  }

  private calculateKurtosis(data: number[]): number {
    const mean = this.calculateMean(data);
    const variance = this.calculateVariance(data);
    const standardDeviation = Math.sqrt(variance);

    const numerator = data.reduce((sum, value) => sum + Math.pow(value - mean, 4), 0);
    return (numerator / (data.length * Math.pow(standardDeviation, 4))) - 3;
  }
  private identifyOutliers(data: number[]): number[] {
    const sortedData = [...data].sort((a, b) => a - b);
    const q1 = this.calculatePercentile(sortedData, 0.25);
    const q3 = this.calculatePercentile(sortedData, 0.75);
    const iqr = q3 - q1;
    const lowerBound = q1 - 1.5 * iqr;
    const upperBound = q3 + 1.5 * iqr;

    return data.filter(value => value < lowerBound || value > upperBound);
  }
}
