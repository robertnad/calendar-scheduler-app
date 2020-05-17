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
                        {visibleDays.map(day => (
                            <th key={day}>{day}</th>
                        ))}
                    </tr>

                    {scheduleHours.map(period => (
                        <tr key={period}>
                            <td className="hours">{period}</td>
                            {
                            visibleDays.map(day => (
                                <td key={day+period} className="slots">
                                    <DayChecker day={day} period={period} />
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