import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoAlbumComponent } from './no-album.component';

describe('NoAlbumComponent', () => {
  let component: NoAlbumComponent;
  let fixture: ComponentFixture<NoAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoAlbumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
