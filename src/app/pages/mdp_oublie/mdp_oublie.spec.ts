import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdpOublie } from './mdp_oublie';

describe('MdpOublie', () => {
  let component: MdpOublie;
  let fixture: ComponentFixture<MdpOublie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MdpOublie],
    }).compileComponents();

    fixture = TestBed.createComponent(MdpOublie);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
