import moment from 'moment';

let secondSaturday = undefined;
let fourthSaturday = undefined;

const firstSaturday = moment().startOf('month').day('Saturday');

if(firstSaturday > 7) {
    secondSaturday = firstSaturday.add(14, 'd').date();
    fourthSaturday = firstSaturday.add(14, 'd').date();
    console.log(secondSaturday, fourthSaturday);
} else {
    secondSaturday = firstSaturday.date();
    fourthSaturday = firstSaturday.date();
    console.log(secondSaturday, fourthSaturday);
}