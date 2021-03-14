import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResourceModalPage } from './resource-modal.page';

describe('ResourceModalPage', () => {
  let component: ResourceModalPage;
  let fixture: ComponentFixture<ResourceModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResourceModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
