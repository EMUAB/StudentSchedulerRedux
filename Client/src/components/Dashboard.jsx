import { React, useState } from 'react'
import moment from "moment";
import RefreshIcon from '@mui/icons-material/Refresh';
import "./Dashboard.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DashNavbar from "./Navbar";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { possibleSchedData, possibleTerms } from "./possible-sched-data";
import { logout } from '../AuthService';
import Calendar from './Calendar';
import ScheduleList from './ScheduleList';

function Dashboard() {

  const [isChangeTermModalOpen, setChangeTermModalOpen] = useState(false);
  const [isPreviewScheduleModalOpen, setPreviewScheduleModalOpen] = useState(false);
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
  const [terms, setTerms] = useState(possibleTerms.terms);
  const [selectedSchedule, setSelectedSchedule] = useState(possibleSchedData.schedules[0]);
  const [selectedTerm, setSelectedTerm] = useState(terms[0]);
  const [tempTermID, setTempTermID] = useState(terms[0]);


  const closeChangeTermModal = (isTermChanged) => {
    if (isTermChanged) {
      setSelectedTerm(terms.find(term => term.id === tempTermID));
    }
    setChangeTermModalOpen(false);
  };

  const closePreviewScheduleModal = (isScheduleSelected) => {
    if (isScheduleSelected) {
      setSelectedSchedule();
    }
    setPreviewScheduleModalOpen(false);
  };

  const handleLogout = () => {
    logout();
    window.location.reload();
  }

  return (
    <div className="Dashboard">
      <DashNavbar logout={handleLogout} />
      <div className="card-divs">
        <div className="top-link-card-container" style={{ display: 'flex', marginTop: '1rem', marginBottom: '1rem', textAlign: 'left' }}>
          <Card style={{ width: '18rem', marginRight: '1rem', marginLeft: '1rem', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: "#1b604a", color: "#fff" }}>
            <Card.Body>
              <Card.Title style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{selectedTerm.name}</Card.Title>
              <Card.Text>
                <Button variant="light" size="sm" onClick={() => setChangeTermModalOpen(true)}>Change term</Button>
                <Modal size="md" show={isChangeTermModalOpen} onHide={() => setChangeTermModalOpen(false)} centered>
                  <Modal.Dialog style={{
                    display: 'flex', width: '100%', margin: '0px', fontFamily: 'Inter, sans-serif',
                  }}>
                    <Modal.Header closeButton>
                      <Modal.Title>Change Term</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form.Select aria-label="Term selection form" onChange={(e) => setTempTermID(e.target.value)}>
                        {terms.map((term, index) => (
                          <option key={index} value={term.id} selected={term.id === selectedTerm.id}>{term.name}</option>
                        ))}
                      </Form.Select>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={() => closeChangeTermModal(false)}>Cancel</Button>
                      <Button variant="primary" onClick={() => closeChangeTermModal(true)}>Select</Button>
                    </Modal.Footer>
                  </Modal.Dialog>
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
                <p style={{ marginBottom: '4px' }}>Possible Schedules</p>
                <Button variant="light" size="sm" style={{ marginLeft: 'auto', alignSelf: 'flex-start' }} href="#">
                  <RefreshIcon /> Refresh
                </Button>
              </Card.Title>
              <ScheduleList />
              <Modal size="md" show={isPreviewScheduleModalOpen} onHide={() => setChangeTermModalOpen(false)} centered>
                <Modal.Dialog style={{
                  display: 'flex', width: '100%', margin: '0px', fontFamily: 'Inter, sans-serif',
                }}>
                  <Modal.Header closeButton>
                    <Modal.Title>Preview Schedule</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '50rem', height: '50rem' }}>
                      <h2>Schedule Preview</h2>
                      <Calendar />
                      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1rem' }}>
                        <Button variant="primary" onClick={() => setSelectedSchedule(null)} style={{ width: '10rem', height: '2.5rem', marginTop: '1rem' }}>Choose Schedule</Button>
                        <Button variant="secondary" onClick={() => setPreviewScheduleModalOpen(false)} style={{ width: '6rem', marginTop: '1rem' }}>Cancel</Button>
                      </div>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => closeChangeTermModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={() => closeChangeTermModal(true)}>Select</Button>
                  </Modal.Footer>
                </Modal.Dialog>
              </Modal>
            </Card.Body>
          </Card>
        </div>
      </div >
    </div >
  );
}

export default Dashboard