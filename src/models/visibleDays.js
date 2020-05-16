import moment from 'moment';

// Used for listing next 7 days starting from tomorrow

let visibleDays = [];
const firstVisibleDay = moment().add(0, 'd').day();

for(let i = firstVisibleDay + 1; i < (firstVisibleDay + 8); i++) {
    visibleDays.push(moment().day(i).format('ddd DD'))
}

// export default visibleDays;
export { visibleDays as default };