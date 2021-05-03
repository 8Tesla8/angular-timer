import { ReadableTimeSpan } from "../services/date-time.service";
import { TimerOption, TimerVisualOption } from "./timer-enum";

export class TimerInfo {
  public type = TimerOption.Countdown;
  public totalTime: ReadableTimeSpan;
  public endTime: Date;

  public visualOptions = TimerVisualOption.Full;
}