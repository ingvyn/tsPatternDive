abstract class Logger {
  abstract log(message: string): void;

  public printDate(): void {
    this.log(new Date().toString());
  }
}

class OnDateLogger extends Logger {
  public log(message: string):void {
    console.log(message);
  }
  public logWithDate(message: string):void {
    super.printDate();
    this.log(message);
  }
}
const tempLogger = new OnDateLogger();
tempLogger.logWithDate('exercise finished');