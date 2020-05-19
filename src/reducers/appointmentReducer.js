const appointmentsDefaultState = [{
        date: undefined,
        time: undefined
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
                    time: action.time
                }
            ];
        case 'DELETE_APPOINTMENT':
            return state.filter(appointment => (
                appointment.date !== action.date //&& !appointment.time.contains(action.time)
            ));
        default:
            return state;
    }
}