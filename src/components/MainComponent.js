import React from 'react';
import Scheduler from './Scheduler';
import ScheduleContext from '../context/schedule-context';
import { visibleDays } from '../utils/visibleDays';
import { scheduleHours } from '../utils/scheduleHours';

const MainComponent = () => {

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