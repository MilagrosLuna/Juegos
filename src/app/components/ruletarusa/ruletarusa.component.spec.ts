import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuletarusaComponent } from './ruletarusa.component';

describe('RuletarusaComponent', () => {
  let component: RuletarusaComponent;
  let fixture: ComponentFixture<RuletarusaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RuletarusaComponent]
    });
    fixture = TestBed.createComponent(RuletarusaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
