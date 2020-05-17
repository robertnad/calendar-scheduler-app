import React, { useState, useEffect } from 'react';
import moment from 'moment';

const DayChecker = ({ day, period }) => {
    
    const [isEvenWeekday, setIsEvenWeekday] = useState();
    const [isPairSaturday, setIsPairSaturday] = useState();
    const [isClosed, setIsClosed] = useState();     // sundays and odd saturdays

    /* Checking for pair saturdays in current month */
    let secondSaturday = moment().startOf('month').day('Saturday').add(7,'d').date();
    let fourthSaturday = moment().startOf('month').day('Saturday').add(21,'d').date();
    let dayInt = parseInt(day.slice(4));
    let pairSaturday = (dayInt === secondSaturday || dayInt === fourthSaturday);

    /* incorporate all together */
    const dayHandler = () => {
        if (day.includes('Sun') || !pairSaturday) {
            setIsEvenWeekday(false);
            setIsPairSaturday(false);
            setIsClosed(true);
        } else if ( day.includes('Sat') && pairSaturday ) {
            setIsEvenWeekday(false);
            setIsPairSaturday(true);
            setIsClosed(false);
        } else {
        }
    }
    useEffect(() => {
        dayHandler();
    }, [])

    const clickHandler = () => {
        console.log(`clicked on ${day} - ${period}`);        
    }

    // console.log(day, day.includes('Sun'));

    return (
        <>
        {}
        <button className="btn" onClick={clickHandler} disabled={isClosed}>{day}</button>
            {/* {scheduleHours.map(period => (
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
            ))} */}
        </>
    )
}

export default DayChecker;