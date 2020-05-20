import React, { useContext, useEffect } from 'react';
import ScheduleContext from '../context/schedule-context';
import DayChecker from './DayChecker';
import TableDates from './TableDates';

const Scheduler = () => {

    const { visibleDays, scheduleHours } = useContext(ScheduleContext);
    
    // generates 15 random appointments by setting localStorage keys from free appointments
    let randomAppointments = [];

    useEffect(() => {
        let freeAppointments = Object.keys(localStorage);
        for (let i = 0; i < 15; i++) {
            randomAppointments = freeAppointments[(Math.floor(Math.random()*freeAppointments.length))];
            localStorage.setItem(randomAppointments, JSON.stringify({
                id: randomAppointments,
                isClicked: false,
                isDisabled: false,
                isTaken: true
            }));
        // console.log(randomAppointments);
        }
    }, []);

    // array for storing user appointment dates - used for 1/day and 2/week limits
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
                                    <DayChecker 
                                        date={date}
                                        time={time}
                                        myAppointments={myAppointments}
                                    />
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