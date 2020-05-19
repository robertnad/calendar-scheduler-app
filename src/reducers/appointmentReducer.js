const appointmentsDefaultState = [{
        date: '',
        time: '',
        isClicked: false
    }]

export const appointmentReducer = (state = appointmentsDefaultState, action) => {
    switch (action.type) {
        case 'POPULATE_STORAGE':
            return action.appointments;
        case 'ADD_APPOINTMENT':
            return [
                ...state,
                {
                    date: action.date,
                    time: action.time,
                    isClicked: true
                }
            ];
        case 'DELETE_APPOINTMENT':
            return state.filter(appointment => (
                appointment.date !== action.date && !appointment.time !== action.time
            ));
        default:
            return state;
    }
}