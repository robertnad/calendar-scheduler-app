import React, { useState, useEffect } from 'react';
import moment from 'moment';

const DayChecker = ({ date, time }) => {

    /* formatted time variables */
    const dateInt = parseInt(date.slice(4));                // turns 'ddd DD' date into DD integer
    const splitTime = time.split(':');                      // splits half hour windows into array
    const timeInt = parseInt(splitTime[0] + splitTime[1])   // converts 'hh:mm' string into hhmm integer

    // constants holding day states
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


    // function that gets stored appointments from localStorage - called in useState hook
    const initialState = () => JSON.parse(localStorage.getItem(dateInt + timeInt));
    
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
        if (appointment && appointment.isClicked) {
            setAppointment({
                date: '',
                time: '',
                isClicked: false
            })
        }
    }

    // updates localStorage everytime new appointment is added
    useEffect(() => {
        localStorage.setItem(dateInt + timeInt, JSON.stringify(appointment));
        console.log(appointment);
    }, [appointment]);

    // function to handle button className - used to change button color
    const handleButtonStyle = () => {
        if (appointment && appointment.isClicked) {
            return 'btn--clicked'
        }
        else if (isPause) {
            return 'btn--pause'
        }
        return 'btn'
    }

    return (
        <>
            <button className={handleButtonStyle()} onClick={handleAppointment} disabled={isClosed || isPause}></button>
        </>
    )
}

export default DayChecker;