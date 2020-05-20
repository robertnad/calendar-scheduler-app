import React, { useContext } from 'react';
import ScheduleContext from '../context/schedule-context';

const TableDates = () => {

    const { visibleDays } = useContext(ScheduleContext)

    return (

        <tr className="dates">
            <th></th>
            {visibleDays.map(date => (
                <th key={date}>{date}</th>
            ))}
        </tr>

    );
}

export default TableDates;