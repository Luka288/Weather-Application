import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyContainerComponent } from './hourly-container.component';

describe('HourlyContainerComponent', () => {
  let component: HourlyContainerComponent;
  let fixture: ComponentFixture<HourlyContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HourlyContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HourlyContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
