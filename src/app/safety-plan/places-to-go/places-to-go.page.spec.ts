import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlacesToGoPage } from './places-to-go.page';

describe('PlacesToGoPage', () => {
  let component: PlacesToGoPage;
  let fixture: ComponentFixture<PlacesToGoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacesToGoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlacesToGoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
