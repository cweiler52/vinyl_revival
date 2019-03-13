import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProdviewComponent } from './admin-prodview.component';

describe('AdminProdviewComponent', () => {
  let component: AdminProdviewComponent;
  let fixture: ComponentFixture<AdminProdviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProdviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProdviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
