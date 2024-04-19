import React from 'react';
import { Modal } from 'react-bootstrap';
import { AccountCircle } from '@mui/icons-material';

const ProfileModal = ({ userInfo, isOpen, handleProfileModal }) => {
    return <>
        <Modal show={isOpen} onHide={() => handleProfileModal(false)} style={{ fontFamily: 'Inter, sans-serif' }}>
            <Modal.Header closeButton>
                <Modal.Title>Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '20px' }}>
                <AccountCircle style={{ height: 80, width: 80 }} />
                <p>{userInfo.name}</p>
                <p>Year {userInfo.year}</p>
            </Modal.Body>
        </Modal>
    </>;
};

export default ProfileModal;