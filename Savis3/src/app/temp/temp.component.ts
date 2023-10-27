import { Component } from '@angular/core';

@Component({
  selector: 'app-temp',
  templateUrl: './temp.component.html',
  styleUrls: ['./temp.component.scss']
})
export class TempComponent {
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = ['Label 1', 'Label 2', 'Label 3', 'Label 4'];
  public barChartData = [
    { data: [45, 65, 25, 35], label: 'Sample Data' }
  ];

  public updateChartValue(index: number, value: number): void {
    this.barChartData[0].data[index] = value;
    this.barChartData = [...this.barChartData];
  }
}
