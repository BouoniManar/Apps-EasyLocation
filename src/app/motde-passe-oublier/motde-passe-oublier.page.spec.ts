import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MotdePasseOublierPage } from './motde-passe-oublier.page';

describe('MotdePasseOublierPage', () => {
  let component: MotdePasseOublierPage;
  let fixture: ComponentFixture<MotdePasseOublierPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MotdePasseOublierPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
