import React from 'react';
import moment from 'moment';
import Modal from 'react-modal';

const DayChecker = ({ day, period }) => {

    /* formatted time variables */
    const dayInt = parseInt(day.slice(4));                    // turns 'ddd DD' date into DD integer
    const splitHours = period.split(':');                     // splits half hour windows into array
    const hourInt = parseInt(splitHours[0] + splitHours[1])   // converts 'hh:mm' string into hhmm integer

    /* Checking for pair saturdays in current month */
    const secondSaturday = moment().startOf('month').day('Saturday').add(7,'d').date();
    const fourthSaturday = moment().startOf('month').day('Saturday').add(21,'d').date();
    
    const pairSaturday = day.includes('Sat') && (dayInt === secondSaturday || dayInt === fourthSaturday);
    const oddSaturday = day.includes('Sat') && !pairSaturday
    const sunday = day.includes('Sun');
    const weekday = !sunday && !pairSaturday && !oddSaturday;
    const evenWeekday = weekday && (dayInt % 2 === 0);
    const oddWeekday = weekday && !evenWeekday;

    const morningShift = (evenWeekday || pairSaturday) && (hourInt > 1330 || hourInt === 1100);
    const afternoonShift = oddWeekday && (hourInt < 1300 || hourInt === 1600);
    const closed = sunday || oddSaturday || morningShift || afternoonShift;

    console.log(dayInt, hourInt, closed);    
    // const randomAppointments = [];


    // console.log(day, period, dayInt, hourInt);
    // console.log(`${day} ${period} \n EvenWeekday: ${evenWeekday} \n OddWeekday: ${oddWeekday} \n PairSaturday: ${pairSaturday} \n OddSaturday: ${oddSaturday} \n Sunday: ${sunday}`);

    /* TO DO: 
        1) random generator for taken appointments
        2) modal to confirm appointment
        3) populate local storage after making appointment
        4) allow only 1 appointment a day and 2 per week
        5) css styling for closedDays, lunchBreak, takenAppointments, myAppointments 
    */

    const clickHandler = () => {
        console.log(`clicked on ${day} - ${period}`);        
    }

    return (
        <>
            <button className="btn" onClick={clickHandler} disabled={closed}></button>
        </>
    )
}

export default DayChecker;





/* {scheduleHours.map(period => (
                <tr key={period}>
                    <td className="hours">{period}</td>
                    {
                     visibleDays.map(day => (
                        <td key={day+period} className="slots">
                            <button className="btn" onClick={clickHandler}></button>
                        </td>
                        ))
                    }
                </tr>
            ))} */

    
    // const [isEvenWeekday, setIsEvenWeekday] = useState();
    // // const [isOddWeekday, setIsOddWeekday] = useState();
    // const [isPairSaturday, setIsPairSaturday] = useState();
    // const [isClosed, setIsClosed] = useState();     // sundays and odd saturdays

    /* incorporate all together */
    // const dayHandler = () => {
    //     if (day.includes('Sun') || !pairSaturday) {     // sunday or odd saturday
    //         setIsEvenWeekday(false);
    //         setIsPairSaturday(false);
    //         setIsClosed(true);
    //     } else if (day.includes('Sat') && pairSaturday) {   // pair saturday
    //         setIsEvenWeekday(false);
    //         setIsPairSaturday(true);
    //         setIsClosed(false);
    //     } else if (!isWeekend && day % 2 === 0) {     // even weekday
    //         setIsEvenWeekday(true);
    //         setIsPairSaturday(false);
    //         setIsClosed(false);
    //     } else if (!isWeekend && day % 2 === 1) {                        // odd weekday
    //         setIsEvenWeekday(false);
    //         setIsPairSaturday(false);
    //         setIsClosed(false);
    //     }
    // }
    // useEffect(() => {
    //     dayHandler();
    // }, [])

    // console.log(`isEvenWeekday: ${isEvenWeekday} \n isPairSaturday: ${isPairSaturday} \n isClosed: ${isClosed} `);


    
// const initialState = {
//     isSunday: undefined,
//     isPairSaturday: undefined,
//     isEvenWeekday: undefined
// };
// const dayReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case 'CLOSED':
//             return {
//                 isSunday: true,
//                 isPairSaturday: false,
//                 isEvenWeekday: false
//             };
//         case 'PAIR_SATURDAY':
//             return {
//                 isSunday: false,
//                 isPairSaturday: true,
//                 isEvenWeekday: true
//             };
//         case 'EVEN_WEEKDAY':
//             return {
//                 isSunday: false,
//                 isPairSaturday: false,
//                 isEvenWeekday: true
//             };
//         default:
//             return state;
//     }
// }
    // const [state, dispatch] = useReducer(dayReducer, initialState);
