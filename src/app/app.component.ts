import { Component } from '@angular/core';
import { TimerVisualOption } from './timer/timer-enum';
import { TimerInfo } from './timer/timer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-project';

  public hours: number | undefined;
  public minutes: number | undefined;
  public seconds: number | undefined;

  public visualOptions: TimerVisualOption | undefined;
  public timerOptions: TimerVisualOption | undefined;

  public timersInfo: Array<TimerInfo> = []; // TimerData ;

  public addTimer(): void {
    let info = new TimerInfo();
    info.startTime = this.getTimeUtc( new Date());
    info.endTime = this.getTimeUtc( this.getTimerTime()); 
    info.totalTime = this.difference(info.startTime, info.endTime);


    this.timersInfo.push(info);
    //debugger;
  }

  private getTimeUtc(date: Date) : Date {
    var now_utc = Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds()
    );

    return new Date(now_utc);
  }

  private getTimerTime(): Date{
    let dt = new Date();
    if(this.hours){
      dt.setHours( dt.getHours() + this.hours );
    }
    if(this.minutes){
      dt.setMinutes( dt.getMinutes() + this.minutes );
    }
    if(this.seconds){
      dt.setSeconds(dt.getSeconds() + this.seconds);
    }

    return dt;
  }

  private difference(startDate: Date, endDate: Date): Date {
    let seconds = (endDate.getTime() - startDate.getTime()) / 1000;
    let dt = new Date();
    dt.setSeconds(seconds);
 
    return this.getTimeUtc(dt);
  }
}
