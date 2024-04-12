import { React, useState } from 'react'
import { possibleSchedData } from "./possible-sched-data";
import { Visibility } from '@mui/icons-material';


const viewSchedule = (scheduleID, setModal) => {
    console.log('Viewing schedule', scheduleID);
    // TODO - add schedule viewing modal
    setModal(true);
};

const ScheduleList = ({setModal}) => {
    const [possibleSchedules, setPossibleSchedules] = useState(possibleSchedData.schedules);

    const renderSchedules = () => {
        const scheduleElements = [];
        possibleSchedules.forEach(schedule => {
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
                    key={schedule.id}
                >
                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingLeft: '4px', paddingRight: '8px' }}>
                        {schedule.courseIds.join(', ')}
                    </div>
                    <div onClick={() => viewSchedule(schedule.id, setModal)} style={{ cursor: 'pointer', fontSize: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: 'auto', paddingRight: '4px' }}>
                        <Visibility />
                        View
                    </div>
                </div>
            );
        });
        return scheduleElements;
    };

    return (
        <div style={{ borderRadius: '2px', display: 'flex', flexDirection: 'column' }}>
            {renderSchedules()}
        </div>
    );

}



export default ScheduleList;