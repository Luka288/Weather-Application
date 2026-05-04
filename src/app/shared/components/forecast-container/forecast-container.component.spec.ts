import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastContainerComponent } from './forecast-container.component';

describe('ForecastContainerComponent', () => {
  let component: ForecastContainerComponent;
  let fixture: ComponentFixture<ForecastContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForecastContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForecastContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
