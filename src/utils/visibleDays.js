import moment from 'moment';

/* List next 7 days starting from tomorrow */
export let visibleDays = [];

const firstVisibleDay = moment().day();

for(let i = (firstVisibleDay + 1); i < (firstVisibleDay + 8); i++) {
    visibleDays.push(moment().day(i).format('ddd DD'));
}