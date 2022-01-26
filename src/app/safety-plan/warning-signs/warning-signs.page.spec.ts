import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WarningSignsPage } from './warning-signs.page';

describe('WarningSignsPage', () => {
  let component: WarningSignsPage;
  let fixture: ComponentFixture<WarningSignsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarningSignsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WarningSignsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
