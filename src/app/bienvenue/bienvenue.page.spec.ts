import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BienvenuePage } from './bienvenue.page';

describe('BienvenuePage', () => {
  let component: BienvenuePage;
  let fixture: ComponentFixture<BienvenuePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BienvenuePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
