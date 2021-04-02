import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatefundraiserComponent } from './createfundraiser.component';

describe('CreatefundraiserComponent', () => {
  let component: CreatefundraiserComponent;
  let fixture: ComponentFixture<CreatefundraiserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatefundraiserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatefundraiserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
