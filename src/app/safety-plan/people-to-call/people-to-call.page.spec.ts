import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PeopleToCallPage } from './people-to-call.page';

describe('PeopleToCallPage', () => {
  let component: PeopleToCallPage;
  let fixture: ComponentFixture<PeopleToCallPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleToCallPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PeopleToCallPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
