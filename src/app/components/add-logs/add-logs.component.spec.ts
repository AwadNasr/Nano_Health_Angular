import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLogsComponent } from './add-logs.component';

describe('AddLogsComponent', () => {
  let component: AddLogsComponent;
  let fixture: ComponentFixture<AddLogsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddLogsComponent]
    });
    fixture = TestBed.createComponent(AddLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
