// import { Component, ElementRef, ViewChild } from '@angular/core';
// import { CalculationService } from './service/CalculationService';
// import { TranslateService } from '../Utils/translate.service';
// import { MathService } from '../Utils/math.service';
// import { ChartModuleService } from './service/ChartModule.service';

// @Component({
//   selector: 'app-one-proportion',
//   templateUrl: './one-proportion.component.html',
//   styleUrls: ['./one-proportion.component.scss']
// })
// export class OneProportionComponent {
//   state: any
//   translationData: any
//   chart: any

//   @ViewChild('probabilityChart') probabilityInput!: ElementRef
//   @ViewChild('coins') coinsInput!: ElementRef 
//   @ViewChild('probsDisplay') probsDisplay!: ElementRef
//   @ViewChild('tossesDisplay') tossesDisplay!: ElementRef
//   @ViewChild('lowerDisplay') lowerDisplay!: ElementRef
//   @ViewChild('upperDisplay') upperDisplay!: ElementRef
//   @ViewChild('drawInput') drawInput!: ElementRef
//   @ViewChild('chart') chartRef! : ElementRef
//   @ViewChild('totalSamples') totalSamples!: ElementRef
//   @ViewChild('lowerSelectedRange') lowerSelectedRange!: ElementRef
//   @ViewChild('upperSelectedRange') upperSelectedRange!: ElementRef
//   @ViewChild('sampleInRangeDisplay') sampleInRangeDisplay!: ElementRef
//   @ViewChild('resetBtn') resetBtn!: ElementRef
//   @ViewChild('sampleBtn') sampleBtn!: ElementRef
//   @ViewChild('proportionDisplay') proportionDisplay!: ElementRef
//   @ViewChild('meanDisplay') meanDisplay!: ElementRef
//   @ViewChild('stdDisplay') stdDisplay!: ElementRef

//   constructor(
//     private cal: CalculationService,
//     private translate: TranslateService,
//     private sampleStddev: MathService,
//     private ChartModule : ChartModuleService
//   ) {
//     this.state = this.initState()
//     // this.translationData = translation.oneProportion;
//   }

//   ngOninit() {
//     this.loadEventListener()
//     this.updateView()
//   }

//   initState = () => {
//     return {
//       noOfCoin: 5,
//       probability: 0.5,
//       labels: [],
//       binomail: [],
//       samples: [],
//       selected: [],
//       mean: NaN,
//       std: NaN,
//       noOfSelected: 0,
//       totalSamples: 0,
//       lowerSelectedRange: 0,
//       upperSelectedRange: 0,
//       thisSampleSizes: 1,
//       zoomIn: false
//     }
//   }

//   loadEventListener(): void {
//     // this.probabilityInput.nativeElement.addEventListener('input', (e: any) => {
//     //   this.state.probability = Number(e.target.value)
//     //   this.probsDisplay.innerText = Number(e.target.value)
//     // })
//   }

//   updateView():void {}
// }
