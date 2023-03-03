"use strict";
class Logger {
    printDate() {
        this.log(new Date().toString());
    }
}
class OnDateLogger extends Logger {
    log(message) {
        console.log(message);
    }
    logWithDate(message) {
        super.printDate();
        this.log(message);
    }
}
const tempLogger = new OnDateLogger();
tempLogger.logWithDate('exercise finished');
