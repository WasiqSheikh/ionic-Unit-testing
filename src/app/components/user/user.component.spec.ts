import { ComponentFixture, TestBed, fakeAsync, flush, waitForAsync } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormatMobPipe } from 'src/app/pipes/format-mob.pipe';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let el: DebugElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent, FormatMobPipe]
    });
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should find the button with using (done)', (done) => {

  //   const button: HTMLButtonElement = el.query(By.css('button')).nativeElement;
  //   button.click();
  //   setTimeout(() => {
  //     expect(component.username).toBe("Edward Lewis");
  //     done();
  //   }, 1000)
  // })

  // it('should show username after the button is clicked using (fakeAsync)', fakeAsync(() => {

  //   const button: HTMLButtonElement = el.query(By.css('button')).nativeElement;
  //   button.click();
  //   flush();
  //   expect(component.username).toBe("Edward Lewis");
  // }))

  it('should show username after the button is clicked using (waitForAsync)', waitForAsync(() => {

    const button: HTMLButtonElement = el.query(By.css('button')).nativeElement;
    button.click();
    fixture.whenStable().then(() => {
      expect(component.username).toBe("Leanne Graham");
    })
  }))
});
