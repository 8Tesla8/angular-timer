import { Component, Input } from '@angular/core';
import { TimerOption, TimerVisualOption } from '../timer.models/timer-enum';
import { TimerInfo } from '../timer.models/timer-info.model';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent {
  private _info: TimerInfo;

  @Input()
  set info(value: TimerInfo) {
    this._info = value;
    this.checkType(this.info.type);
  }

  get info(): TimerInfo {
    return this._info;
  }

  public countdownString = '';

  constructor() {}

  public checkType(timerOption: TimerOption): void {
    if (timerOption === TimerOption.Countdown) {
      this.startTimer();
    } else if (timerOption === TimerOption.Clear) {
      this.clear();
    } else if (timerOption === TimerOption.ShowFixedTime) {
      this.showFixedTime();
    }
  }

  private startTimer(): void {
    this.clearInterval();

    this._info.id = setInterval(() => {
      let showSmall = this._info.visualOptions === TimerVisualOption.Small;

      var now = new Date().getTime();
      var distance = this._info.endTime.getTime() - now;
      this.countdownString = this.transformMilisecondInString(distance,showSmall);

      if (distance < 0) {
        this.clearInterval();
        this.countdownString = '0';
      }
      //test
      console.log('Timer: ' + this.countdownString);
    }, 1000);
  }

  private clear(): void {
    this.clearInterval();

    this.countdownString = '-';
  }

  private showFixedTime(): void {
    this.clearInterval();

    let arr = this._info.totalTime.split(':');

    let hours = Number(arr[0]);
    let minutes = Number(arr[1]);
    let seconds = Number(arr[2]);

    let showSmall = this._info.visualOptions === TimerVisualOption.Small;

    this.countdownString = this.transform(hours, minutes, seconds, showSmall);
  }

  private clearInterval(): void{
    if (this.info.id) {
      clearInterval(this.info.id);
    }

    this.info.id = undefined;
  }

  private transformMilisecondInString(miliseconds: number, showSmall: boolean) : string{
    let hours = Math.floor(
        (miliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
    let minutes = Math.floor((miliseconds % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((miliseconds % (1000 * 60)) / 1000);

    let result = this.transform(hours, minutes, seconds, showSmall);
    return result;
}

  private transform( hours: number, minutes: number, seconds: number, showSmall: boolean): string {
    let result = '';

    if (showSmall) {
      if (hours > 0) {
        result = hours + 'h';
      } else if (minutes > 0) {
        result = minutes + 'm';
      } else {
        result = seconds + 's';
      }
    } else {
      result = hours + 'h:' + minutes + 'm:' + seconds + 's';
    }

    return result;
  }
}
