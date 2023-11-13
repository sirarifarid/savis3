import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VarianceChartComponent } from './variance-chart.component';

describe('VarianceChartComponent', () => {
  let component: VarianceChartComponent;
  let fixture: ComponentFixture<VarianceChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VarianceChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VarianceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
