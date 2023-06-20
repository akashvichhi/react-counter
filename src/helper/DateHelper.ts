import IDate from "../types/IDate";

export const convertToDate = (seconds: number): IDate => {
    let days: number | string = 0, hours: number | string = 0, minutes: number | string = 0;
    if (seconds > 3600 * 24) {
        days = Math.floor(seconds / (3600 * 24));
        seconds -= days * 3600 * 24;
    }
    if (seconds >= 3600) {
        hours = Math.floor(seconds / 3600);
        seconds -= hours * 3600;
    }
    if (seconds >= 60) {
        minutes = Math.floor(seconds / 60);
        seconds -= minutes * 60;
    }
    
    if (days.toString().length === 1) days = "0" + days;
    hours = ("0" + hours).slice(-2);
    minutes = ("0" + minutes).slice(-2);

    return {
        days: days.toString(),
        hours,
        minutes,
        seconds: ("0" + seconds).slice(-2),
    };
}

