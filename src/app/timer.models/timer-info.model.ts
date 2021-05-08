import { TimerOption, TimerVisualOption } from "./timer-enum";

export class TimerInfo {
  public type = TimerOption.Countdown;
  public totalTime: string;
  public endTime: Date;

  public visualOptions = TimerVisualOption.Full;

  public id: ReturnType<typeof setTimeout> | any;
}