import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionListComponent } from './solution-list.component';

describe('SolutionListComponent', () => {
  let component: SolutionListComponent;
  let fixture: ComponentFixture<SolutionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolutionListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolutionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
