import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilProprietairePage } from './profil-proprietaire.page';

describe('ProfilProprietairePage', () => {
  let component: ProfilProprietairePage;
  let fixture: ComponentFixture<ProfilProprietairePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilProprietairePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
