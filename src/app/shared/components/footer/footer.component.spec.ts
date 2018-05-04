import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be define clickBtn method', () => {
    expect(component.clickBtn).toBeDefined();
  });

  it('call btnEvent method', () => {
    spyOn(component.btnEvent, 'next');
    const event = new Event(null);
    component.clickBtn(new Event(null));
    expect(component.btnEvent.next).toHaveBeenCalledWith(event);
  });
});
