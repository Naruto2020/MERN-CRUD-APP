import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUsrComponent } from './add-usr.component';

describe('AddUsrComponent', () => {
  let component: AddUsrComponent;
  let fixture: ComponentFixture<AddUsrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUsrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUsrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
