import React from "react";
import styled from "@emotion/styled";
import ColumnEntry from "./ColumnEntry";


const ScheduleList = styled.div`
margin: 8px;about:blank#blocked
border-radius: 2px;
display: flex;
flex-direction: column;
`;

export default class Column extends React.Component {
    render() {
        return (
            <ScheduleList>
                {this.props.schedules.map(scheudule => <ColumnEntry key={scheudule.id} schedule={scheudule} />)}
            </ScheduleList>
        )
    }
}