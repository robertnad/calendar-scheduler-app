import React, { useEffect } from 'react';
import Scheduler from './Scheduler';
import ScheduleContext from '../context/schedule-context';
import visibleDays from '../utils/visibleDays';
import scheduleHours from '../utils/scheduleHours';

const MainComponent = () => {
    
    // // array that will hold 15 random localStorage keys from clickable appointments
    // const randomAppointmentArr = [];

    // useEffect(() => {
    //     const freeAppointmentKeys = Object.keys(localStorage);
    //     for (let i = 0; i < 15; i++) {
    //         randomAppointmentArr[i] = freeAppointmentKeys[(Math.floor(Math.random()*freeAppointmentKeys.length))]
    //         // localStorage.setItem(randomAppointmentArr[i], JSON.stringify({
    //         //     id: randomAppointmentArr[]
    //         // }));
    //     }
    // }, []);
    // console.log(randomAppointmentArr);

    useEffect(() => {
        const freeAppointmentKeys = Object.keys(localStorage);
        for (let i = 0; i < 15; i++) {
            let randomKey = freeAppointmentKeys[(Math.floor(Math.random()*freeAppointmentKeys.length))];
            localStorage.setItem(randomKey, JSON.stringify({
                id: randomKey,
                isClicked: true,
                isClickable: false
            }));
        }
    });

    return (
        <div>
            <ScheduleContext.Provider value={{ visibleDays, scheduleHours }}>
                <h1>Calendar</h1>
                <Scheduler />
            </ScheduleContext.Provider>
        </div>
    );
}

export default MainComponent;