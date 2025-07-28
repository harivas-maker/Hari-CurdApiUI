import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaculityComponent } from './faculity.component';

describe('FaculityComponent', () => {
  let component: FaculityComponent;
  let fixture: ComponentFixture<FaculityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FaculityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaculityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
