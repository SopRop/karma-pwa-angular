import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OldEntryComponent } from './old-entry.component';

describe('OldEntryComponent', () => {
  let component: OldEntryComponent;
  let fixture: ComponentFixture<OldEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OldEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OldEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
