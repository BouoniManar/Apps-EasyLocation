import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MesAnnoncesPage } from './mes-annonces.page';

describe('MesAnnoncesPage', () => {
  let component: MesAnnoncesPage;
  let fixture: ComponentFixture<MesAnnoncesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MesAnnoncesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
