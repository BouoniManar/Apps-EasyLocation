import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilLocatairePage } from './profil-locataire.page';

describe('ProfilLocatairePage', () => {
  let component: ProfilLocatairePage;
  let fixture: ComponentFixture<ProfilLocatairePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilLocatairePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
