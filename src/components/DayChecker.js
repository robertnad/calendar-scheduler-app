import React, { useState, useEffect } from 'react';
import moment from 'moment';

const DayChecker = ({ date, time }) => {

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
    const [appointment, setAppointment] = useState({
        // date: '',
        // time: '',
        id: '',
        isClicked: false,
        isClickable: isClosed || isPause
    });


    // useRef hook for checking previous appointment state - used for limiting number of appointments
    // const prevAppointmentRef = useRef();
    // useEffect(() => {
    //     prevAppointmentRef.current = appointment;
    // });
    // const prevAppointment = prevAppointmentRef.current;

    

    // checks if more than 1 appointment in the same day
    // const dailyAppointmentLimiter = () => {
    //     if (appointment.date.includes(dateInt)) {
    //     }
    // }


    // gets stored appointments from local storage and initializes appointment state
    useEffect(() => {
        const appointment = JSON.parse(localStorage.getItem(dateInt + '_' + timeInt));
        if (appointment) {
            setAppointment(appointment);
        }
    }, []);


    // updates localStorage everytime new appointment is added
    useEffect(() => {
        if (!appointment.isClickable) {
            localStorage.setItem(dateInt + '_' + timeInt, JSON.stringify(appointment));
        }
        console.log(appointment);
    }, [appointment]);


    // onclick handler - adds appointment
    const handleAppointment = () => {
        setAppointment({
            // date: date,
            // time: time,
            id: dateInt + '_' + timeInt,
            isClicked: true
        });
        // unclick button - deletes appointment
        if (appointment && appointment.isClicked) {
            setAppointment({
                // date: '',
                // time: '',
                id: '',
                isClicked: false
            });
        }
    }

    // function to change button className for css purposes
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