import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CopingStrategiesPage } from './coping-strategies.page';

describe('CopingStrategiesPage', () => {
  let component: CopingStrategiesPage;
  let fixture: ComponentFixture<CopingStrategiesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopingStrategiesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CopingStrategiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
