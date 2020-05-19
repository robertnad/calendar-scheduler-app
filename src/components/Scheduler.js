import React, { useContext } from 'react';
import ScheduleContext from '../context/schedule-context';
import DayChecker from './DayChecker';


const Scheduler = () => {

    const { visibleDays, scheduleHours } = useContext(ScheduleContext);

    return (
        <div className="tab">
            <table>
                <tbody>
                    
                    <tr className="dates">
                        <th></th>
                        {visibleDays.map(date => (
                            <th key={date}>{date}</th>
                        ))}
                    </tr>

                    {scheduleHours.map(time => (
                        <tr key={time}>
                            <td className="hours">{time}</td>
                            {
                            visibleDays.map(date => (
                                <td key={date+time} className="slots">
                                    <DayChecker date={date} time={time} />
                                </td>
                                ))
                            }
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
        
            // {scheduleHours.map(period => (
            //     <tr key={period}>
            //         <td className="hours">{period}</td>
            //         {
            //         visibleDays.map(day => (
            //             <td key={day+period} className="slots">
            //                 <DayChecker day={day} period={period} />
            //             </td>
            //             ))
            //         }
            //     </tr>
            // ))}