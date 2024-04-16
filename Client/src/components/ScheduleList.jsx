import { React, useState } from 'react'
import { possibleSchedData } from "./possible-sched-data";
import { Visibility } from '@mui/icons-material';


const viewSchedule = (courses, setModal) => {
    setModal(true, courses);
};

const ScheduleList = ({ setModal, coursesToPreview }) => {

    const renderSchedules = () => {
        const scheduleElements = [];
        // possibleSchedules.forEach(schedule => {
        scheduleElements.push(
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#ffe',
                    color: '#000',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    padding: '4px',
                    marginBottom: '8px',
                    height: '3em'
                }}
                key={1} // Fix if generating Schedules
            >
                <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingLeft: '4px', paddingRight: '8px' }}>
                    {coursesToPreview.map(course => course.crn).join(', ')}
                </div>
                <div onClick={() => viewSchedule(coursesToPreview, setModal)} style={{ cursor: 'pointer', fontSize: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: 'auto', paddingRight: '4px' }}>
                    <Visibility />
                    View
                </div>
            </div>
        );
        // });
        return scheduleElements;
    };

    return (
        <div style={{ borderRadius: '2px', display: 'flex', flexDirection: 'column' }}>
            {renderSchedules()}
        </div>
    );

}



export default ScheduleList;