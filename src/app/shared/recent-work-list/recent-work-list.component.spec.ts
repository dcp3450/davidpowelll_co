import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentWorkListComponent } from './recent-work-list.component';

describe('RecentWorkListComponent', () => {
  let component: RecentWorkListComponent;
  let fixture: ComponentFixture<RecentWorkListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentWorkListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentWorkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
