import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccountVerificationPage } from './account-verification.page';

describe('AccountVerificationPage', () => {
  let component: AccountVerificationPage;
  let fixture: ComponentFixture<AccountVerificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountVerificationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountVerificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
