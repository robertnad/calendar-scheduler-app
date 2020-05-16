import React, { useContext } from 'react';
import ScheduleContext from '../context/schedule-context';
// import moment from 'moment';
// import MorningHours from './MorningHours';
// import AfternoonHours from './AfternoonHours';

    /*--------------------------------------------------------------*/
    // const now = moment();
    // const today = now.format('ddd DD YYYY');
    // console.log(today); // String
    // const todayInt = parseInt(now.format('DD'));
    // console.log(todayInt); // integer (Number)

    /*--------------------------EVEN-DAYS---------------------------*/

    // const [isEvenDate, setIsEvenDate] = useState();

    // const evenDateHandler = () => {
    //     if(todayInt % 2 === 0) {
    //         console.log(`${today} is even date: 8-14h`);
    //         setIsEvenDate(true);
    //     } else {
    //         console.log(`${today} is uneven date: 13-19h`);
    //         setIsEvenDate(false);
    //     }
    // }
    /*--------------------------------------------------------------*/

    // const handlePreviousDay = () => {
    //     x = x-1;
    //     // visibleDays.pop();
    //     // visibleDays.unshift(moment().day().format('ddd DD'));
    // }
    // const handleNextDay = () => {
    //     x = x+1;
    //     // visibleDays.shift();
    //     // visibleDays.push(moment().day().format('ddd DD'));
    // }
    // <button onClick={handlePreviousDay}>Previous</button>
    // <button onClick={handleNextDay}>Next</button>
    // console.log(x);
    
    

    // const dateNum = moment().day();
    // console.log(moment().day(dateNum).format('ddd DD'));

    // if(moment().format('ddd') === 'Thu') {
    //     console.log(`Its ${moment().format('dddd')}`);
    // }

    // const dateNum = moment().day();
    // console.log(moment().day(dateNum).format('ddd DD'));
    // console.log(moment().day());
    
    // const startOfMonth = moment().startOf('month').format('ddd');
    // const startOfMonthDay = moment().startOf('month').day()
    // const endOfMonth = moment().endOf('month').day();
    // const endOfMonthDay = moment().endOf('month').format('DD');

    // const currentMonth = moment().month();
    // const numOfDaysInMonth = moment(currentMonth+1, "M").daysInMonth();
    // console.log(currentMonth+1, numOfDaysInMonth);


    /*----------------------FIND-PAIR-SATURDAYS---------------------*/
    // let secondSaturday = undefined;
    // let fourthSaturday = undefined;

    // const firstSaturday = moment().startOf('month').day('Saturday');
    // console.log(firstSaturday);
    // if(firstSaturday > 7) {
    //     secondSaturday = firstSaturday.add(14, 'd').date();
    //     fourthSaturday = firstSaturday.add(14, 'd').date();
    //     console.log(secondSaturday, fourthSaturday);
    // } else {
    //     secondSaturday = firstSaturday.date();
    //     fourthSaturday = firstSaturday.date();
    //     console.log(secondSaturday, fourthSaturday);
    // }
    /*--------------------------------------------------------------*/

    
/* DO WITH HOOKS */
// let isNotSunday = undefined;
// let isPairSaturday = undefined;
// let isEvenDate = undefined;

const Scheduler = () => {

    // const [isEvenDate, setIsEvenDate] = useState();

    // const handleEvenDate = () => {
    //     if(todayInt % 2 === 0) {
    //         console.log(`${today} is even date: 8-14h`);
    //         setIsEvenDate(true);
    //     } else {
    //         console.log(`${today} is uneven date: 13-19h`);
    //         setIsEvenDate(false);
    //     }
    // }

    const {visibleDays, scheduleHours} = useContext(ScheduleContext);

    return (
        <div className="tab">
            <table>
                <tbody>
                    <tr className="dates">
                        <th></th>
                        {visibleDays.map(day => (
                            <th key={day}>{day}</th>
                        ))}
                    </tr>
                
            
                    {scheduleHours.map(period => (
                        <tr key={period}>
                            <td className="hours">{period}</td>
                                {visibleDays.map(day => (
                                    <td key={day+period} className="slots">
                                        <button className="btn"></button>
                                    </td>
                                )
                            )}
                        </tr>
                    ))}
                </tbody>
            
            </table>
        </div>
    );
}

export default Scheduler;

/* {(isNotSunday && !isPairSaturday) ? 
                (
                isPairSaturday ?  <MorningHours />
                    :
                    (isEvenDate ? <MorningHours /> : <AfternoonHours />)
                )
                :
                false
            } */