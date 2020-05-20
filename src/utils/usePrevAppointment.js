import { useEffect, useRef } from 'react';

export const usePrevAppointment = (appointment) => {
    const ref = useRef();
  
    useEffect(() => {
        ref.current = appointment;
    });
  
    return ref.current;
}

/*

    // useRef hook containing prevState of appointment
    const prevAppointmentRef = useRef();
        useEffect(() => {
            prevAppointmentRef.current = appointment;
        });
    const prevAppointment = prevAppointmentRef.current;

*/