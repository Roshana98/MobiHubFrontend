import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyMobihubComponent } from './why-mobihub.component';

describe('WhyMobihubComponent', () => {
  let component: WhyMobihubComponent;
  let fixture: ComponentFixture<WhyMobihubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhyMobihubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhyMobihubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
