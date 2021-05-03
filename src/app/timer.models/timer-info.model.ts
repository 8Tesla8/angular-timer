import { TimerOption, TimerVisualOption } from "./timer-enum";

export class TimerInfo {
  public type = TimerOption.Countdown;
  public totalTime: Date;
  public endTime: Date;

  public visualOptions = TimerVisualOption.Full;
}