import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AjoutAnnoncePage } from './ajout-annonce.page';

describe('AjoutAnnoncePage', () => {
  let component: AjoutAnnoncePage;
  let fixture: ComponentFixture<AjoutAnnoncePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutAnnoncePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
