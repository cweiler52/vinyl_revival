import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProdlistComponent } from './admin-prodlist.component';

describe('AdminProdlistComponent', () => {
  let component: AdminProdlistComponent;
  let fixture: ComponentFixture<AdminProdlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProdlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProdlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
