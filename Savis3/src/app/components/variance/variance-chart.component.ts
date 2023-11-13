import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-variance-chart',
  templateUrl: './variance-chart.component.html',
})
export class VarianceChartComponent implements OnInit, OnDestroy {
   public positiveValues: number[] = [10, 15, 5];
   public negativeValues: number[] = [-5, -8, -3];
   public barChartLabels: string[] = ['Category 1', 'Category 2', 'Category 3'];
  @ViewChild('varianceChart') chartRef!: ElementRef;

  private chart!: Chart;

  ngOnInit(): void {
    this.initializeChart();
  }

  ngOnDestroy(): void {
    this.destroyChart();
  }

  private initializeChart(): void {
    const ctx = this.chartRef.nativeElement.getContext('2d');

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.barChartLabels,
        datasets: [
          {
            label: 'Positive',
            data: this.positiveValues,
            backgroundColor: 'rgba(75, 192, 192, 0.7)',
          },
          {
            label: 'Negative',
            data: this.negativeValues,
            backgroundColor: 'rgba(255, 99, 132, 0.7)',
          },
        ],
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
            },
          }],
        },
      },
    });
  }

  private destroyChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
