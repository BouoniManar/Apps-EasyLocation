import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProprietairePage } from './proprietaire.page';

describe('ProprietairePage', () => {
  let component: ProprietairePage;
  let fixture: ComponentFixture<ProprietairePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProprietairePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
