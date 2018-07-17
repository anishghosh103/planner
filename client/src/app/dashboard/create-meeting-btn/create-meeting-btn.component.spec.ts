import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMeetingBtnComponent } from './create-meeting-btn.component';

describe('CreateMeetingBtnComponent', () => {
  let component: CreateMeetingBtnComponent;
  let fixture: ComponentFixture<CreateMeetingBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMeetingBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMeetingBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
