import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewpassswordComponent } from './newpasssword.component';

describe('NewpassswordComponent', () => {
  let component: NewpassswordComponent;
  let fixture: ComponentFixture<NewpassswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewpassswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewpassswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
