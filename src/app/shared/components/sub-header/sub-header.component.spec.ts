import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubHeaderComponent } from './sub-header.component';

describe('SubHeaderComponent', () => {
  let component: SubHeaderComponent;
  let fixture: ComponentFixture<SubHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be define create method', () => {
    expect(component.create).toBeDefined();
  });

  it('should be define remove method', () => {
    expect(component.remove).toBeDefined();
  });

  it('call createEvent method', () => {
    spyOn(component.createEvent, 'next');
    component.create();
    expect(component.createEvent.next).toHaveBeenCalled();
  });

  it('call removeEvent method', () => {
    spyOn(component.removeEvent, 'next');
    component.remove();
    expect(component.removeEvent.next).toHaveBeenCalled();
  });

});
