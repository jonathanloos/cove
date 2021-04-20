import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EmptyStateModalPage } from './empty-state-modal.page';

describe('EmptyStateModalPage', () => {
  let component: EmptyStateModalPage;
  let fixture: ComponentFixture<EmptyStateModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmptyStateModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EmptyStateModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
