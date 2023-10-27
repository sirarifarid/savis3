import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneProportionComponent } from './one-proportion.component';

describe('OneProportionComponent', () => {
  let component: OneProportionComponent;
  let fixture: ComponentFixture<OneProportionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OneProportionComponent]
    });
    fixture = TestBed.createComponent(OneProportionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
