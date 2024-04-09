import React from 'react';
import styled from "@emotion/styled";
import { Visibility } from '@mui/icons-material';

const Container = styled.div`
    border: 1px solid lightgrey;
    border-radius: 8px;
    padding: 4px;
    margin-bottom: 8px;
    background: #ffffee;
    color: #000;
    font-weight: bold;
    height: 3em;
`;

export default class ColumnEntry extends React.Component {
    viewSchedule = () => {
        console.log('Viewing schedule', this.props.schedule.id);
        // TODO - add schedule viewing modal
    };

    render() {
        return (
            <Container style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingLeft: '4px', paddingRight: '8px' }}>
                    {this.props.schedule.courseIds.join(', ')}
                </div>
                <div onClick={this.viewSchedule} style={{ cursor: 'pointer', fontSize: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '0px', marginLeft: 'auto', paddingRight: '4px' }}>
                    <Visibility />
                    View
                </div>
            </Container>
        );
    }
}
