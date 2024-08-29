import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceModalComponent } from './place-modal.component';

describe('PlaceModalComponent', () => {
  let component: PlaceModalComponent;
  let fixture: ComponentFixture<PlaceModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlaceModalComponent]
    });
    fixture = TestBed.createComponent(PlaceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
