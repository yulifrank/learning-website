import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodingRaceComponent } from './coding-race.component';

describe('CodingRaceComponent', () => {
  let component: CodingRaceComponent;
  let fixture: ComponentFixture<CodingRaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodingRaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CodingRaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
