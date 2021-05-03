import { Component } from '@angular/core';
import { DateTimeService } from './services/date-time.service';
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
    info.endTime = this.dateService.getTimeUtc(this.getTimerTime()); 
    info.totalTime = new Date(); 
    info.type = this.timerOptions;
    info.visualOptions = this.visualOptions;

    this.timersInfo.push(info);

    this.clearProps();
  }

  public remove(index: number):void{
    this.timersInfo.slice(index,1);
  }

  public clear(index: number):void{
    
  }

  public fixed(index: number):void{
    
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

  private clearProps():void{
    this.hours = undefined;
    this.minutes = undefined;
    this.seconds = undefined;
    this.visualOptions = TimerVisualOption.Full;
    this.timerOptions = TimerOption.Countdown;
  }
}
