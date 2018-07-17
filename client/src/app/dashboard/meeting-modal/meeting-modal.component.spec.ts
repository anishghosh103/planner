import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingModalComponent } from './meeting-modal.component';

describe('MeetingModalComponent', () => {
  let component: MeetingModalComponent;
  let fixture: ComponentFixture<MeetingModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
