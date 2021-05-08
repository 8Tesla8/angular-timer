import { Component } from '@angular/core';
import { TimerOption, TimerVisualOption } from './timer.models/timer-enum';
import { TimerInfo } from './timer.models/timer-info.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public hours: number | undefined;
  public minutes: number | undefined;
  public seconds: number | undefined;

  public visualOptions = TimerVisualOption.Full;
  public timerOptions = TimerOption.Countdown;

  public timersInfo: Array<TimerInfo> = [];

  public addTimer(): void {
    let info = new TimerInfo();

    if (this.timerOptions === TimerOption.Countdown) {
      info.endTime = this.getTimerTime();
    } else if (this.timerOptions === TimerOption.ShowFixedTime) {
      info.totalTime = this.getTimeSpan();
    }

    info.type = this.timerOptions;
    info.visualOptions = this.visualOptions;

    this.timersInfo.push(info);

    this.clearProperties();
  }

  public remove(index: number): void {
    let timersInfo = [];

    for (var i = 0; i < this.timersInfo.length; i++) {
      if (i === index) {  }
      else {
        timersInfo.push(this.timersInfo[i]);
      }
    }

    this.timersInfo = timersInfo;
  }

  public clear(index: number): void {
    let info = new TimerInfo();
    info.type = TimerOption.Clear;
    info.id = this.timersInfo[index].id;

    this.timersInfo[index] = info;
  }

  public fixed(index: number): void {
    let info = new TimerInfo();
    info.type = TimerOption.ShowFixedTime;
    info.totalTime = this.getTimeSpan();
    info.id = this.timersInfo[index].id;
    
    this.timersInfo[index] = info;
  }


  private getTimerTime(): Date {
    let dt = new Date();
    if (this.hours) {
      dt.setHours(dt.getHours() + this.hours);
    }
    if (this.minutes) {
      dt.setMinutes(dt.getMinutes() + this.minutes);
    }
    if (this.seconds) {
      dt.setSeconds(dt.getSeconds() + this.seconds);
    }

    return dt;
  }

  private getTimeSpan(): string {
    let ts = "";

    if (this.hours) {
      ts += this.hours + ":";
    }
    else{
      ts+= "00:";
    }

    if (this.minutes) {
      ts += this.minutes + ":";
    }
    else {
      ts+= "00:";
    }

    if (this.seconds) {
      ts += this.seconds;
    }
    else {
      ts += "00";
    }

    return ts;
  }

  private clearProperties(): void {
    this.hours = undefined;
    this.minutes = undefined;
    this.seconds = undefined;
    this.visualOptions = TimerVisualOption.Full;
    this.timerOptions = TimerOption.Countdown;
  }
}
