import { Component, Input } from '@angular/core';
import { DateTimeService } from '../services/date-time.service';
import { TimerOption, TimerVisualOption } from '../timer.models/timer-enum';
import { TimerInfo } from '../timer.models/timer-info.model';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent {

  @Input()
  set info(value: TimerInfo) {
    this._info = value;
    this.checkType(this.info.type);
  }

  get info(): TimerInfo {
    return this._info;
  }

  public countdownString = '';

  public _info: TimerInfo;
  private interval: ReturnType<typeof setTimeout> ;
  private dateService = new DateTimeService()

  constructor() {}


  public checkType (timerOption: TimerOption) : void{
    if(timerOption === TimerOption.Countdown){
      this.startTimer();
    }
    else if(timerOption === TimerOption.Clear){
      this.clear();
    }
    else if(timerOption === TimerOption.ShowFixedTime){

      if(this.info.totalTime !== undefined){
        this.showFixedTime();
      }
      else {
        if (this.interval) {
          clearInterval(this.interval);
        }
        var now = new Date().getTime();
        var distance = this.info.endTime.getTime() - now;    
        let timeSpan = this.dateService.convertMiliseconds(distance);
        this.countdownString = this.dateService.transformIntoString(timeSpan, this.info.visualOptions === TimerVisualOption.Small);      }

    }
  }

  private countTime(){

  }


  private startTimer() : void {

    var interval = setInterval(() => {
      var now = new Date().getTime();
      var distance = this.info.endTime.getTime() - now;
      let timeSpan = this.dateService.convertMiliseconds(distance);
      this.countdownString = this.dateService.transformIntoString(timeSpan, this.info.visualOptions === TimerVisualOption.Small);
  
      if (distance <= 0) {
        clearInterval(this.interval);
        this.countdownString = "0";
      }
    }, 1000);

    this.interval = interval;

  }


  private clear(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }

    this.countdownString = "-";
  }

  private showFixedTime() : void{
    this.countdownString = this.dateService.transformIntoString(this.info.totalTime, this.info.visualOptions === TimerVisualOption.Small);
  }
}

