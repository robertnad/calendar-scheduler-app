import moment from 'moment';

export const daySorter = (date, time) => {

    const dateInt = parseInt(date.slice(4));
    const splitTime = time.split(':');
    const timeInt = parseInt(splitTime[0] + splitTime[1]);

    const secondSaturday = moment().startOf('month').day('Saturday').add(7,'d').date();
    const fourthSaturday = moment().startOf('month').day('Saturday').add(21,'d').date();

    const pairSaturday = date.includes('Sat') && (dateInt === secondSaturday || dateInt === fourthSaturday);
    const oddSaturday = date.includes('Sat') && !pairSaturday
    const sunday = date.includes('Sun');
    const weekday = !sunday && !pairSaturday && !oddSaturday;
    const evenWeekday = weekday && (dateInt % 2 === 0);
    const oddWeekday = weekday && !evenWeekday;

    const morningPause = (evenWeekday || pairSaturday) && (timeInt === 1100);
    const afternoonPause = oddWeekday && (timeInt === 1600);

    const morningShift = (evenWeekday || pairSaturday) && (timeInt > 1330);
    const afternoonShift = oddWeekday && (timeInt < 1300 || timeInt === 1600);

    const isPause = morningPause || afternoonPause;
    const isClosed = sunday || oddSaturday || morningShift || afternoonShift;

    return isPause, isClosed, dateInt, timeInt;
}