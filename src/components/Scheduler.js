import React, { useContext, useEffect } from 'react';
import ScheduleContext from '../context/schedule-context';
import DayChecker from './DayChecker';
import TableDates from './TableDates';


const Scheduler = () => {

    const { visibleDays, scheduleHours } = useContext(ScheduleContext);

    // generates 15 random appointments by setting localStorage keys from free appointments (isDisabled===false)
    // for duplicate keys problem just shuffle array and take first 15 items
    let freeAppointmentKeys = [];
    useEffect(() => {
        freeAppointmentKeys = Object.keys(localStorage);
        for (let i = 0; i < 15; i++) {
            let randomKey = freeAppointmentKeys[(Math.floor(Math.random()*freeAppointmentKeys.length))];
            localStorage.setItem(randomKey, JSON.stringify({
                id: randomKey,
                isClicked: false,
                isDisabled: false,
                isTaken: true
            }));
        }
    // console.log(freeAppointmentKeys);
    }, []);

    // array for storing user appointment dates - helps in 1/day and 2/week limits
    let myAppointments = [];
    

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
                                    <DayChecker date={date} time={time} myAppointments={myAppointments} />
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