import { visibleDays } from './visibleDays';
import { scheduleHours } from './scheduleHours';

let visibleDaysArr = [];

const visibleDaysFormat = visibleDays.map(date => {
    visibleDaysArr.push(parseInt(date.slice(4)));
})

let scheduleHoursArr1 = [];

const scheduleHoursFormat = scheduleHours.map(time => {
    scheduleHoursArr1.push(time.split(':'));
})


let scheduleHoursArr2 = [];
const scheduleHoursFormat2 = scheduleHoursArr1.map(splitTime => {
    scheduleHoursArr2.push(parseInt(splitTime[0] + splitTime[1]));
})

export let dateTimeArr = [];

// pushes dd_hhmm format to dateTimeArr
scheduleHoursArr2.map(time => (
    visibleDaysArr.map(date => (
        dateTimeArr.push(date + '_' + time)
    ))
))