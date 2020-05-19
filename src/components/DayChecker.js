  
import React, { useState, useEffect } from 'react';
import moment from 'moment';

const DayChecker = ({ date, time }) => {

    /* formatted time variables */
    const dateInt = parseInt(date.slice(4));                // turns 'ddd DD' date into DD integer
    const splitTime = time.split(':');                      // splits half hour windows into array
    const timeInt = parseInt(splitTime[0] + splitTime[1])   // converts 'hh:mm' string into hhmm integer

    /* Checking for pair saturdays in current month */
    const secondSaturday = moment().startOf('month').day('Saturday').add(7,'d').date();
    const fourthSaturday = moment().startOf('month').day('Saturday').add(21,'d').date();
    
    const pairSaturday = date.includes('Sat') && (dateInt === secondSaturday || dateInt === fourthSaturday);
    const oddSaturday = date.includes('Sat') && !pairSaturday
    const sunday = date.includes('Sun');
    const weekday = !sunday && !pairSaturday && !oddSaturday;
    const evenWeekday = weekday && (dateInt % 2 === 0);
    const oddWeekday = weekday && !evenWeekday;

    const morningPause = (evenWeekday || pairSaturday) && (timeInt === 1100);
    const afternoonPause = oddWeekday && (timeInt === 1600);

    const morningShift = (evenWeekday || pairSaturday) && (timeInt > 1330);
    const afternoonShift = oddWeekday && (timeInt < 1300 || timeInt === 1600);

    const isPause = morningPause || afternoonPause;
    const isClosed = sunday || oddSaturday || morningShift || afternoonShift;




    const initialState = () => JSON.parse(localStorage.getItem('appointment'));
    // console.log(localStorage.getItem('appointment'));
    
    const [appointment, setAppointment] = useState(initialState);

    // click button - adds appointment
    const handleAppointment = () => {
        console.log(`clicked on ${date} - ${time}`);        
        setAppointment({
            date: date,
            time: time,
            isClicked: true
        })
        // unclick button - deletes appointment
        if (appointment.isClicked) {
            setAppointment({
                date: '',
                time: '',
                isClicked: false
            })
        }
    }

    // useEffect(() => {
    //     const appointment = JSON.parse(localStorage.getItem('appointment'));
    //     if (appointmentReducer) {
    //         setAppointment(appointment);
    //     }
    // }, []);

    useEffect(() => {
        localStorage.setItem('appointment', JSON.stringify(appointment));
        console.log(appointment);
        const data1 = JSON.parse(localStorage.getItem('appointment'));
    }, [appointment]);


    const handleButtonStyle = () => {
        if (appointment.isClicked) { return 'btn--clicked' }
        else if (isPause) { return 'btn--pause' }
        else { return 'btn'}
    }

    return (
        <>
            <button className={handleButtonStyle()} onClick={handleAppointment} disabled={isClosed || isPause}></button>
        </>
    )
}

export default DayChecker;