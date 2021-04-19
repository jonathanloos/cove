import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WarningSignEmptyStatePage } from './warning-sign-empty-state.page';

describe('WarningSignEmptyStatePage', () => {
  let component: WarningSignEmptyStatePage;
  let fixture: ComponentFixture<WarningSignEmptyStatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarningSignEmptyStatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WarningSignEmptyStatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
