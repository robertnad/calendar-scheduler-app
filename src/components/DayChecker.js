import React, { useState, useEffect } from 'react';
import moment from 'moment';

const DayChecker = ({ date, time, myAppointments }) => {

    // formatted time variables from date and time props
    const dateInt = parseInt(date.slice(4));                // turns 'ddd DD' (ex. 'Mon 15') date format into DD (ex. 15) integer
    const splitTime = time.split(':');                      // splits half hour windows into array
    const timeInt = parseInt(splitTime[0] + splitTime[1])   // converts 'hh:mm' (ex. '12:30') hour format into hhmm (ex. 1230) integer

    /* --------------------------- constants holding day states --------------------------- */
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
    const afternoonShift = oddWeekday && (timeInt < 1300);
    const isPause = morningPause || afternoonPause;
    const isClosed = sunday || oddSaturday || morningShift || afternoonShift;
    /* ------------------------------------------------------------------------------------- */


    // useState hook for handling appointment state
    // isDisabled used only for fetching free appointments in localStorage
    const [appointment, setAppointment] = useState({
        id: dateInt + '_' + timeInt,
        isClicked: false,
        isDisabled: isClosed || isPause,
        isTaken: false
    });

    // gets stored appointments from localStorage and initializes appointment state after refresh
    useEffect(() => {
        const appointment = JSON.parse(localStorage.getItem(dateInt + '_' + timeInt));
        if (appointment) {
            setAppointment(appointment);
        }
    }, []);


    // updates localStorage everytime new appointment (that is not disabled or taken) is added
    useEffect(() => {
        if (!appointment.isDisabled && !appointment.isTaken) {
            localStorage.setItem(dateInt + '_' + timeInt, JSON.stringify(appointment));
        }
        console.log(appointment)
    }, [appointment]);

    // splits appointment id - used for limiting 1/day appointment
    const dayId = appointment.id.slice(0,2);

    // onclick handler - adds appointment, also handles 1/day and 2/week limits
    const handleAppointment = () => {
        if (!appointment.isTaken && myAppointments.length < 1 /*myAppointments.length < 2*/) {
            setAppointment({
                id: dateInt + '_' + timeInt,
                isClicked: true,
                isDisabled: isClosed || isPause
            });
            myAppointments.push(dayId);

        } else if (!appointment.isTaken && myAppointments.length < 2 && myAppointments[0] !== dayId) {
            setAppointment({
                id: dateInt + '_' + timeInt,
                isClicked: true,
                isDisabled: isClosed || isPause
            });
            myAppointments.push(dayId);
        }
        // unclick button - deletes appointment
        if (appointment && appointment.isClicked) {
            setAppointment({
                id: dateInt + '_' + timeInt,
                isClicked: false,
                isDisabled: isClosed || isPause
            });
            myAppointments.splice(myAppointments.indexOf(dayId), 1);
        }
    }

    // function to change button className for styling purposes
    const handleButtonStyle = () => {
        if (appointment && appointment.isClicked) {
            return 'btn--clicked'
        }
        else if (isPause) {
            return 'btn--pause'
        }
        else if (appointment.isTaken) {
            return 'btn--taken'
        }
        return 'btn'
    }

    return (
        <>
            <button className={handleButtonStyle()} onClick={handleAppointment} disabled={isClosed || isPause || appointment.isTaken}></button>
        </>
    )
}

export default DayChecker;