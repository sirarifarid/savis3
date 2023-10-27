import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  generateLabels(noOfCoin: number): number[] {
    const labels = Array(noOfCoin + 1);
    for (let i = 0; i < noOfCoin + 1; i++) {
      labels[i] = i;
    }
    return labels;
  }

  calculateBinonimal(noOfCoin: number, probability: number, totalSamples: number): number[] {
    const coeff = Array(noOfCoin + 1).fill(0);
    coeff[0] = 1;
    const binomailBase = Array(noOfCoin + 1);
    /**
     * dynamic programming
     */
    binomailBase[0] = Math.pow(1 - probability, noOfCoin);
    for (let i = 1; i < noOfCoin + 1; i++) {
      coeff[i] = (coeff[i - 1] * (noOfCoin + 1 - i)) / i;
      binomailBase[i] =
        coeff[i] *
        Math.pow(1 - probability, noOfCoin - i) *
        Math.pow(probability, i);
    }
    return binomailBase.map(x => x * totalSamples);
  }

  drawSamples(probability: number, noOfCoin: number, noOfDraw: number): any[] {
    const drawResults = Array(noOfDraw);
    for (let i = 0; i < noOfDraw; i++) {
      const singleDraw = Array(noOfCoin).fill(NaN);
      drawResults[i] = singleDraw.map(x => {
        return Math.random() < probability ? 1 : 0;
      });
    }
    return drawResults;
  }

  calculateMean(sampleData: any[]): number {
    return (
        // i = no of success
        // x = frequency or no of essays
        sampleData.reduce((acc, x, i) => acc + x * i, 0) /
        sampleData.reduce((acc, x) => acc + x, 0)
      );
  }

  calucalteStd(sampleData: any[]): number {
    const mean = this.calculateMean(sampleData);
    console.log(mean);
    let a = sampleData.reduce((acc, x, i) => acc + (i - mean) * (i - mean) * x, 0)
    const b = sampleData.reduce((acc, x) => acc + x, 0) - 1
    console.log(a/b);
    /*console.log("s");
    console.log(Math.sqrt(a/b));*/
    return Math.sqrt(
      sampleData.reduce((acc, x, i) => acc + (i - mean) * (i - mean) * x, 0) /
      (sampleData.reduce((acc, x) => acc + x, 0) - 1)
    );
  }

  calculateSamplesSelected(lower: number, upper: number, samples: any[]): number {
    lower = lower >= 0 ? lower : 0;
    upper = upper <= samples.length ? upper : samples.length;
    return samples.reduce((acc, x, i) => {
      if (i >= lower && i <= upper) return acc + x;
      return acc;
    }, 0);
  }

  generateSelectedArray(lower: number, upper: number, noOfCoin: number): any[] {
    lower = lower >= 0 ? lower : 0;
    upper = upper <= noOfCoin + 2 ? upper : noOfCoin + 2;
    const selected = Array(noOfCoin + 2).fill(NaN);
    return selected.map((x, i) => {
      if (i >= lower && i <= upper + 1) return 0;
      return x;
    });
  }

  addSamples(originalSamples: any[], drawResults: any[]): any[] {
    const summary = drawResults.reduce((acc, eachDraw) => {
        const noOfHead = eachDraw.reduce((accHeads: any, head: any) => accHeads + head, 0);
        const headsCount = acc[noOfHead] + 1 || 1;
        return { ...acc, [noOfHead]: headsCount };
      }, {});
  
      return originalSamples.map((x, i) => x + (summary[i] || 0));
  }

  calculateSelectedProportion(selected: number, total: number): number {
    return selected / total;
  }

}
