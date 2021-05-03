import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { DateTimeService } from '../services/date-time.service';
import { TimerOption, TimerVisualOption } from '../timer.models/timer-enum';
import { TimerInfo } from '../timer.models/timer-info.model';

//https://www.w3schools.com/howto/howto_js_countdown.asp

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  @Input()
  public info: TimerInfo;

  public countdownString = '';

  private interval: ReturnType<typeof setTimeout> ;
  private dateService = new DateTimeService()

  private presState = TimerOption.ShowFixedTime;

  constructor() {}

  ngOnInit(): void {
    // this.startTimer();
    debugger;
    this.checkType(this.info.type);
  }


  public checkType (timerOption: TimerOption) : void{
    if(timerOption === TimerOption.Countdown){
      this.startTimer();
    }
    else if(timerOption === TimerOption.Clear){
      this.clear();
    }
    else if(timerOption === TimerOption.ShowFixedTime){
      this.showFixedTime();
    }
  }



  private startTimer() : void {

    var interval = setInterval(() => {
     this.showFixedTime();

      console.log("countdown " + this.countdownString);
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
    var now = new Date().getTime();

    var distance = this.info.endTime.getTime() - now;

    let timeSpan = this.dateService.convertMiliseconds(distance);

    this.countdownString = this.dateService.transformIntoString(timeSpan, this.info.visualOptions === TimerVisualOption.Small);

    if (distance <= 0) {
      clearInterval(this.interval);
      this.countdownString = "0";
    }
  }
}

