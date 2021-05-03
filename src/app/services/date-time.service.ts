export class DateTimeService {

    public getTimeUtc(date: Date) : Date {
        var now_utc = Date.UTC(
          date.getUTCFullYear(),
          date.getUTCMonth(),
          date.getUTCDate(),
          date.getUTCHours(),
          date.getUTCMinutes(),
          date.getUTCSeconds()
        );
    
        return new Date(now_utc);
      }

      public convertMiliseconds(miliseconds: number ): ReadableTimeSpan{
        let timespan = new ReadableTimeSpan();

        timespan.days = Math.floor(miliseconds / (1000 * 60 * 60 * 24));
        timespan.hours = Math.floor(
          (miliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        timespan.minutes = Math.floor((miliseconds % (1000 * 60 * 60)) / (1000 * 60));
        timespan.seconds = Math.floor((miliseconds % (1000 * 60)) / 1000);
            
        return timespan;
      }

      public transformIntoString(timeSpan: ReadableTimeSpan, showSmall: boolean): string{
        let result = "";
        
        let days = this.transformValueIntoString(timeSpan.days, "d ", showSmall);
        let hours = this.transformValueIntoString(timeSpan.hours, "h ", showSmall);
        let minutes = this.transformValueIntoString(timeSpan.minutes, "m ", showSmall);
        let seconds = this.transformValueIntoString(timeSpan.seconds, "s ", showSmall);
        
        if(showSmall){
          let count =0;

          if(days != ""){
            result += days;
            count++;
          }
          if(hours != "") {
            result += hours;
            count++;
          }
          if(count < 2) {
            result += minutes;
            count++;
          }
          if(count < 2) {
            result += seconds;
          }
        }
        else {
          result = days + hours + minutes + seconds;
        }

        return result;
      }

      private transformValueIntoString(value: number, syfix: string, showSmall: boolean): string {
        let result = "";

        if (showSmall && value > 0){
            result += value + syfix;
        }
        else if (showSmall === false){
          result += value + syfix;
        }
    
        return result;
      }
}

export class ReadableTimeSpan{
    public days: number;
    public hours: number;
    public minutes: number;
    public seconds: number;
}
