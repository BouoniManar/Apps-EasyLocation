import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProprietaireMessagesPage } from './proprietaire-messages.page';

describe('ProprietaireMessagesPage', () => {
  let component: ProprietaireMessagesPage;
  let fixture: ComponentFixture<ProprietaireMessagesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProprietaireMessagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
