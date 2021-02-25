import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SafetyPlanPage } from './safety-plan.page';

describe('SafetyPlanPage', () => {
  let component: SafetyPlanPage;
  let fixture: ComponentFixture<SafetyPlanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SafetyPlanPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SafetyPlanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
