import { Component, Input, OnInit } from '@angular/core';
import { TimerOption, TimerVisualOption } from './timer-enum';

//https://www.w3schools.com/howto/howto_js_countdown.asp

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  @Input()
  public info: TimerInfo;

  @Input()
  public visualOption = TimerVisualOption.Full;

  public countdownString = '';

  private interval: ReturnType<typeof setTimeout> ;

  constructor() {}

  public r = new R();

  ngOnInit(): void {
    this.startTimer();
  }


  startTimer() {
    var countDownDate = this.info.endTime.getTime();

    var b = this.r;

    // Update the count down every 1 second
    var interval = setInterval(function () {
      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result in the element with id="demo"
      let result = '';

      if (days > 0) {
        result += days + 'd ';
      }
      if (hours > 0) {
        result += hours + 'h ';
      }
      if (minutes > 0) {
        result += minutes + 'm ';
      }
      if (seconds > 0) {
        result += seconds + 's ';
      }

      // If the count down is finished, write some text
      if (distance <= 0) {
        clearInterval(interval);
        result = "0";
      }

      console.log("interval " + result);
      //link.setStr(result);
      b.result = result;
    }, 1000);

    this.interval = interval;

    //this.interval.refresh();
  }


  clear() {
    if (this.interval) {
      clearInterval(this.interval);
    }

    this.countdownString = "";
  }

  setStr(str: string) {
    this.countdownString = str;
  }
}

export class TimerInfo {
  public type = TimerOption.None;
  public totalTime: Date;
  public startTime: Date; //+
  public endTime: Date;

  public visualOptions = TimerVisualOption.Full;
}

export class R{
  result= ""; 
}