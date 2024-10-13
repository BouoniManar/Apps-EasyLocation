import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditAnnoncePage } from './edit-annonce.page';

describe('EditAnnoncePage', () => {
  let component: EditAnnoncePage;
  let fixture: ComponentFixture<EditAnnoncePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAnnoncePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
