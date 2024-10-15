import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MesLocationsPage } from './mes-locations.page';

describe('MesLocationsPage', () => {
  let component: MesLocationsPage;
  let fixture: ComponentFixture<MesLocationsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MesLocationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
