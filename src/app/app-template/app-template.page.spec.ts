import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AppTemplatePage } from './app-template.page';

describe('AppTemplatePage', () => {
  let component: AppTemplatePage;
  let fixture: ComponentFixture<AppTemplatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppTemplatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AppTemplatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
