import React, { useState, useEffect } from 'react';
import moment from 'moment';

const DayChecker = ({ date, time, myAppointments }) => {

    // formatted time variables from date and time props
    const dateInt = parseInt(date.slice(4));                // turns 'ddd DD' (ex. 'Mon 15') date format into DD (ex. 15) integer
    const splitTime = time.split(':');                      // splits half hour windows into array
    const timeInt = parseInt(splitTime[0] + splitTime[1])   // converts 'hh:mm' (ex. '12:30') hour format into hhmm (ex. 1230) integer

    /* --------------------------- constants holding day states --------------------------- */
    const isSecondSaturday = moment().startOf('month').day('Saturday').add(7,'d').date();
    const isFourthSaturday = moment().startOf('month').day('Saturday').add(21,'d').date();
    const isPairSaturday = date.includes('Sat') && (dateInt === isSecondSaturday || dateInt === isFourthSaturday);
    const isOddSaturday = date.includes('Sat') && !isPairSaturday
    const isSunday = date.includes('Sun');
    const isWeekday = !isSunday && !isPairSaturday && !isOddSaturday;
    const isEvenWeekday = isWeekday && (dateInt % 2 === 0);
    const isOddWeekday = isWeekday && !isEvenWeekday;
    const isMorningPause = (isEvenWeekday || isPairSaturday) && (timeInt === 1100);
    const isAfternoonPause = isOddWeekday && (timeInt === 1600);
    const isMorningShift = (isEvenWeekday || isPairSaturday) && (timeInt > 1330);
    const isAfternoonShift = isOddWeekday && (timeInt < 1300);
    const isPause = isMorningPause || isAfternoonPause;
    const isClosed = isSunday || isOddSaturday || isMorningShift || isAfternoonShift;
    // /* ------------------------------------------------------------------------------------- */

    /* useState hook for handling appointment state
    isDisabled property used only for fetching free appointments in localStorage */
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
        console.log(appointment)
    }, []);

    // updates localStorage everytime new appointment (that is not disabled or taken) is added
    useEffect(() => {
        if (!appointment.isDisabled && !appointment.isTaken) {
            localStorage.setItem(dateInt + '_' + timeInt, JSON.stringify(appointment));
        }
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