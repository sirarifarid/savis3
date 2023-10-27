// import { Injectable } from '@angular/core';
// import * as Chart from 'chart.js';  // Assuming you have Chart.js library installed
// import { ChartData, ChartTooltipItem } from 'chart.js';

// interface ExtendedChartDataSets extends Chart.ChartDataSets {
//     id?: string
// }

// interface ExtendedChartXAxe extends Chart.ChartXAxe {
//     barPercentage?: number
// }

// @Injectable({
//   providedIn: 'root'
// })

// export class ChartModuleService {
//   private zoomIn?: boolean;
//   private color: any;
//   private translationData: any;
//   private dataFromCalculation: any;
//   private chart: any;

//   constructor() {}

//   initChart(canvasEle: any, translation: any): void {
//     this.zoomIn = false;
//     this.color = {
//       sample: "rgba(255,0,0,0.7)",
//       binomial: "rgba(0,0,255,0.6)",
//       selected: "rgba(0,255,0,0.6)",
//       line: "rgba(0,255,0,0.6)",
//       box: "rgba(0,255,0,0.1)",
//       invisible: "rgba(0,255,0,0.0)"
//     };
//     this.translationData = translation;
//     this.dataFromCalculation = {
//       theoryMean: 0,
//       noOfSelected: 0
//     };

//     // Creating datasets for Chart
//     const datasets: ExtendedChartDataSets[] = [
//         {
//             label: this.translationData.Samples,
//             data: [],
//             borderWidth: 1,
//             id: "x-axis-1",
//             backgroundColor: this.color.sample,
//             hidden: false
//           },
//           {
//             type: "line",
//             label: this.translationData.binomial,
//             data: [],
//             borderWidth: 1,
//             id: "x-axis-2",
//             borderColor: this.color.binomial,
//             backgroundColor: this.color.binomial,
//             pointRadius: 3,
//             fill: false,
//             hidden: false
//           },
//           {
//             type: "line",
//             label: this.translationData.selected,
//             data: [],
//             borderWidth: 0.1,
//             id: "x-axis-3",
//             backgroundColor: this.color.selected,
//             hidden: false,
//             fill: "end"
//           }
//     ]

//     // Creating xAxes for Chart
//     const xAxes: ExtendedChartXAxe[] = [
//         {
//             barPercentage: 1.0,
//             scaleLabel: {
//               display: true,
//               labelString: this.translationData.noOfHeads,
//               //fontColor: "black",
//               //fontSize: "14"
//             }
//           }
//     ]

//     Chart.defaults.global.defaultFontSize = 16;
//     Chart.defaults.global.defaultFontStyle = 'bold';
//     Chart.defaults.global.defaultFontColor = "black";
//     const ctx = canvasEle.getContext("2d");
//     this.chart = new Chart(ctx, {
//         type: "bar",
//         data: {
//           labels: [],
//           datasets: datasets
//         },
//         options: {
//           scales: {
//             yAxes: [
//               {
//                 ticks: {
//                   max: 10,
//                   beginAtZero: true
//                 },
//                 scaleLabel: {
//                   display: true,
//                   labelString: this.translationData.noOfSamples,
//                   //fontColor: "black",
//                   //fontSize: "14"
//                 }
//               }
//             ],
//             xAxes: xAxes
//           },
//           responsive: true,
//           maintainAspectRatio: true,
//           tooltips: {
//             mode: "index",
//             backgroundColor: "rgba(0,0,0,1.0)",
//             callbacks: {
//               title: function(tooltipItem, data) {
//                 let title = tooltipItem[0].xLabel || "";
//                 title += ` ${translation.heads}`;
//                 return title.toString();
//               },
//             label: (tooltipItem: ChartTooltipItem, data: ChartData) => {
//                 if (data && data.datasets && data.datasets[tooltipItem.datasetIndex as number]) {
//                     if (tooltipItem.datasetIndex !== 2) {
//                         return `${data.datasets[tooltipItem.datasetIndex as number].label} : ${
//                             tooltipItem.yLabel
//                         }`;
//                     } else {
//                         return `${data.datasets[tooltipItem.datasetIndex].label} : ${
//                             this.dataFromCalculation?.noOfSelected ?? ''
//                         }`;
//                     }
//                 }
//                 return '';
//             }
//             }
//           }
//         }
//       });

//     // Register plugins as before
//     // ...
//   }

//   updateChartData(dataSet: any) {
//     const {
//       labels,
//       samples,
//       binomail,
//       selected,
//       probability,
//       noOfCoin,
//       noOfSelected,
//       mean,
//       zoomIn
//     } = dataSet;

//     if (!zoomIn) {
//       this.chart.data.labels = labels;
//       this.chart.data.datasets[0].data = samples;
//       this.chart.data.datasets[1].data = binomail;
//       this.chart.data.datasets[2].data = selected;
//     } else {
//       const roundedMean = Math.floor(probability * noOfCoin);
//       const HALF_WIDTH = 25;
//       let lowerRange, upperRange;
//       if (roundedMean - HALF_WIDTH <= 0) {
//         lowerRange = 0;
//         upperRange = lowerRange + HALF_WIDTH * 2;
//       } else if (roundedMean + HALF_WIDTH >= noOfCoin) {
//         upperRange = noOfCoin + 1;
//         lowerRange = upperRange - HALF_WIDTH * 2;
//       } else {
//         lowerRange = roundedMean - HALF_WIDTH;
//         upperRange = roundedMean + HALF_WIDTH;
//       }
//       upperRange = lowerRange + HALF_WIDTH * 2;
//       this.chart.data.labels = labels.slice(lowerRange, upperRange);
//       this.chart.data.datasets[0].data = samples.slice(lowerRange, upperRange);
//       this.chart.data.datasets[1].data = binomail.slice(lowerRange, upperRange);
//       this.chart.data.datasets[2].data = selected.slice(lowerRange, upperRange);
//     }

//     // Se establece un nuevo máximo a la gráfica
//     const maxSamples = Math.max(...samples);
//     if (maxSamples<10){
//       this.chart.options.scales.yAxes[0].ticks.max = 10;
//     } else {
//     if (maxSamples<=100){
//       this.chart.options.scales.yAxes[0].ticks.max = maxSamples + ( 10 - (maxSamples%10) );
//     }else{
//       this.chart.options.scales.yAxes[0].ticks.max = maxSamples + ( 100 - (maxSamples%100) );
//     }}

//     this.dataFromCalculation.theoryMean = mean;
//     this.dataFromCalculation.noOfSelected = noOfSelected;
//     this.chart.mean = mean;
//     this.chart.options.scales.xAxes[0].scaleLabel.labelString = `${
//       this.translationData.noOfHeads
//     } ${noOfCoin} ${this.translationData.tosses2}`;
//     this.chart.update();
//   }
// }

// Chart.pluginService.register({
//   id: "offsetBar",
//   afterUpdate: function(chart: any) {
//     // We get the dataset and set the offset here
//     const dataset = chart.config.data.datasets[2];
//     // const width = dataset._meta[0].data[1]._model.x - dataset._meta[0].data[0]._model.x;
//     let offset;
//     const meta: any = Object.values(dataset._meta)[0];
//     if (meta.data.length > 0) {
//       offset = -(meta.data[1]._model.x - meta.data[0]._model.x) / 2;
//     }

//     // For every data in the dataset ...
//     for (var i = 0; i < meta.data.length; i++) {
//       // We get the model linked to this data
//       var model = meta.data[i]._model;
//       // And add the offset to the `x` property
//       model.x += offset;

//       // .. and also to these two properties
//       // to make the bezier curve fits the new graph
//       model.controlPointNextX += offset;
//       model.controlPointPreviousX += offset;
//     }
//   }
// });

// // Chart.pluginService.register({
// //   id: "sampleBarColor",
// //   beforeUpdate: function(chart) {
// //     if (chart.mean) {
// //       const chartData = chart.config.data; // sample dataset
// //       chartData.datasets[0].backgroundColor = chartData.labels.map(
// //         x =>
// //           `rgba(255,0,0,${1 -
// //             (Math.abs(x - chart.mean) * 1.2) / chartData.labels.length})`
// //       );
// //     }
// //   }
// // });

// Chart.pluginService.register({
//   id: "fixedSamplelegendColor",
//   afterUpdate: function(chart: any) {
//     chart.legend.legendItems[0].fillStyle = "rgba(255,0,0,0.8)";
//   }
// });

// Chart.pluginService.register({
//   id: "dynamicBubbleSize",
//   beforeUpdate: function(chart: any) {
//     if (chart.mean) {
//       const chartData = chart.config.data; // sample dataset
//       const dyanamicSize = 50 / chartData.labels.length;
//       const minSize = 2;
//       chartData.datasets[1].radius =
//         dyanamicSize > minSize ? dyanamicSize : minSize;
//     }
//   }
// });

//   // Add any other methods you need ...

// // Register plugins as before, outside the service class...
// // ...
