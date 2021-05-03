import { Component } from '@angular/core';
import {
  DateTimeService,
  ReadableTimeSpan,
} from './services/date-time.service';
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

  private dateService = new DateTimeService();

  public addTimer(): void {
    let info = new TimerInfo();

    if (this.timerOptions === TimerOption.Countdown) {
      info.endTime = this.dateService.getTimeUtc(this.getTimerTime());
    } else if (this.timerOptions === TimerOption.ShowFixedTime) {
      info.totalTime = this.getTimeSpan();
    }

    info.type = this.timerOptions;
    info.visualOptions = this.visualOptions;

    this.timersInfo.push(info);

    this.clearProps();
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
    this.changeTimerType(index, TimerOption.Clear);
  }

  public fixed(index: number): void {
    this.changeTimerType(index, TimerOption.ShowFixedTime);
  }

  private changeTimerType(index: number, timerOption: TimerOption): void {
    let prev = this.timersInfo[index];

    let info = new TimerInfo();
    info.endTime = prev.endTime;
    info.totalTime = prev.totalTime;
    info.type = timerOption;
    info.visualOptions = prev.visualOptions;

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

  private getTimeSpan(): ReadableTimeSpan {
    let ts = new ReadableTimeSpan();
    if (this.hours) {
      ts.hours = this.hours;
    }
    if (this.minutes) {
      ts.minutes = this.minutes;
    }
    if (this.seconds) {
      ts.seconds = this.seconds;
    }

    return ts;
  }

  private clearProps(): void {
    this.hours = undefined;
    this.minutes = undefined;
    this.seconds = undefined;
    this.visualOptions = TimerVisualOption.Full;
    this.timerOptions = TimerOption.Countdown;
  }
}
