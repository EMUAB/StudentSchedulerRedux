import { useState } from 'react'
import React from "react";
import moment from "moment";
import RefreshIcon from '@mui/icons-material/Refresh';
import "./Dashboard.css";
import Modal from 'react-modal';
import "react-big-calendar/lib/css/react-big-calendar.css";
import DashNavbar from "./Navbar";
import { Button, Card } from "react-bootstrap";
import possibleSchedData from "./possible-sched-data";
import Column from "./Column";
import {logout} from '../AuthService';

const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function Dashboard() {

  const [changeTermModalOpen, setChangeTermModalOpen] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState("Spring 2024");
  const [advisorName, setAdvisorName] = useState("John Doe");
  const [events, setEvents] = useState([
    {
      start: moment().toDate(),
      end: moment()
        .add(1, "days")
        .toDate(),
      title: "Some title"
    }
  ]);
  const [possibleSchedules, setPossibleSchedules] = useState(possibleSchedData.schedules);

  const closeModal = () => {
    setChangeTermModalOpen(false);
  };

  const openModal = () => {
    setChangeTermModalOpen(true);
  };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
  }

  const handleLogout = () => {
    logout();
    window.location.reload();
  }

  return (
    <div className="Dashboard">
      <DashNavbar
        logout={handleLogout}
      />
      <div className="card-divs">
        <div className="top-link-card-container" style={{ display: 'flex', marginTop: '1rem', marginBottom: '1rem', textAlign: 'left' }}>
          <Card style={{ width: '18rem', marginRight: '1rem', marginLeft: '1rem', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: "#1b604a", color: "#fff" }}>
            <Card.Body>
              <Card.Title style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{selectedTerm}</Card.Title>
              <Card.Text>
                <Button variant="light" size="sm" onClick={openModal}>Change term</Button>
                <Modal
                  isOpen={changeTermModalOpen}
                  onAfterOpen={afterOpenModal}
                  onRequestClose={closeModal}
                  style={modalStyle}
                  contentLabel="Change Term Modal"
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h2>Change Term</h2>
                    <button onClick={closeModal}>close</button>
                    <div>I am a modal</div>
                    <form>
                      <input />
                      <button>tab navigation</button>
                      <button>stays</button>
                      <button>inside</button>
                      <button>the modal</button>
                    </form>
                  </div>
                </Modal>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ width: '18rem', marginRight: '1rem', marginLeft: '1rem', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: "#1b604a", color: "#fff" }}>
            <Card.Body>
              <Card.Title style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{advisorName}</Card.Title>
              <Card.Text>
                <Button variant="light" size="sm" href="#">Contact advisor</Button>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div className="courses-container" style={{ display: 'flex', marginTop: '1rem', marginBottom: '1rem', textAlign: 'left' }}>
          <Card style={{ width: '100%', marginRight: '0.5rem', marginLeft: '1rem', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: "#1b604a", color: "#fff" }}>
            <Card.Body>
              <Card.Title style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>Selected Courses</Card.Title>
              <Card.Text>
                <Button variant="light" size="sm" href="#">Add courses</Button>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ width: '100%', marginRight: '1rem', marginLeft: '0.5rem', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: "#1b604a", color: "#fff" }}>
            <Card.Body>
              <Card.Title style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>Recommended Courses</Card.Title>
              <Card.Text>
                <Button variant="light" size="sm" href="#">View recommendations</Button>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div className="schedules-container" style={{ display: 'flex', marginTop: '1rem', marginBottom: '1rem', textAlign: 'left' }}>
          <Card style={{ width: '100%', marginRight: '0.5rem', marginLeft: '1rem', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: "#1b604a", color: "#fff" }}>
            <Card.Body>
              <Card.Title style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>Chosen Schedule</Card.Title>
              <Card.Text>
                No schedule chosen!
              </Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ width: '100%', marginRight: '1rem', marginLeft: '0.5rem', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: "#1b604a", color: "#fff" }}>
            <Card.Body>
              <Card.Title style={{ fontSize: '1.8rem', fontWeight: 'bold', display: 'flex' }}>
                <p>Possible Schedules</p>
                <Button variant="light" size="sm" style={{ marginLeft: 'auto', alignSelf: 'flex-start' }} href="#">
                  <RefreshIcon /> Refresh
                </Button>
              </Card.Title>
              <Card.Text>
                <Column schedules={possibleSchedules} />
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div >
    </div >
  );
}

export default Dashboard
