import React, { useContext } from 'react';
import ScheduleContext from '../context/schedule-context';
import DayChecker from './DayChecker';
import TableDates from './TableDates';


const Scheduler = () => {

    const { visibleDays, scheduleHours } = useContext(ScheduleContext);

    return (
        <div>
            <table>
                <tbody>
                    
                    <TableDates />

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