import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavorisPage } from './favoris.page';

describe('FavorisPage', () => {
  let component: FavorisPage;
  let fixture: ComponentFixture<FavorisPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FavorisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
