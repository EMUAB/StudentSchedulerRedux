import { React, useState, useEffect } from 'react'
import moment from "moment";
import { Refresh, Add } from '@mui/icons-material';
import "./Dashboard.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DashNavbar from "./Navbar";
import { Button, Card, Form, Modal, InputGroup, Accordion } from "react-bootstrap";
import { possibleTerms } from "../sample-data";
import { logout } from '../AuthService';
import Calendar from './Calendar';
import ScheduleList from './ScheduleList';
import { CSModalCourseList, RecCourseList, SelectedCourseList } from './CoursesList';
import { getToken } from '../AuthService';
import { sampleLogins } from '../sample-data';
import ProfileModal from './ProfileModal';

/**
 * Dashboard component.
 *
 * @returns {JSX.Element} The rendered Dashboard component.
 */
function Dashboard() {

  const [isChangeTermModalOpen, setChangeTermModalOpen] = useState(false);
  const [isPreviewScheduleModalOpen, setPreviewScheduleModalOpen] = useState(false);

  const [selectedPreviewSchedule, setSelectedPreviewSchedule] = useState({});
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
  const [selectedSchedule, setSelectedSchedule] = useState({});
  const [selectedTerm, setSelectedTerm] = useState(terms[0]);
  const [tempTermID, setTempTermID] = useState(terms[0]);

  const handleSchedulePreviewModal = (open, previewedSchedule) => {
    if (open) {
      setPreviewScheduleModalOpen(true);
      setSelectedPreviewSchedule(previewedSchedule);
    } else {
      setPreviewScheduleModalOpen(false);
    }
  };

  const closeChangeTermModal = (isTermChanged) => {
    if (isTermChanged) {
      setSelectedTerm(terms.find(term => term.id === tempTermID));
    }
    setChangeTermModalOpen(false);
  };

  const handleLogout = () => {
    logout();
    window.location.reload();
  }
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);

  const userInfo = (sampleLogins.users.find(user => user.id === getToken()) || {});
  const advisorName = (sampleLogins.users.find(user => user.id === userInfo.advisor) || 'No advisor').name;

  const [courses, setCourses] = useState([]);
  const [generalCourses, setGeneralCourses] = useState([]);

  const [sampleSchedules, setSampleSchedules] = useState([]);
  const [studentRecommendations, setStudentRecommendations] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch('/api/courses');
      const data = await response.json();
      setCourses(data.map(course => ({ ...course, checked: false })));
      setGeneralCourses(generalizeCourses(courses));
      // console.log(data);

      const response2 = await fetch('/api/sampleSchedule');
      const data2 = await response2.json();
      setSampleSchedules(data2);
      await getRecommendedCourses();
      // console.log(data2);
    };

    fetchCourses();
  }, []);

  const generalizeCourses = (coursesIn) => {
    return Array.from(
      new Set(
        coursesIn.map(course => `${course.subject}=${course.courseNumber}=${course.title}=${course.credit}=${course.checked}`)
      )
    ).map(id => {
      const [subject, courseNumber, title, credit, checked] = id.split('=');
      return { subject, courseNumber, title, credit, checked: checked === "true" };
    });
  }

  const [isCourseSelectionModalOpen, setCourseSelectionModalOpen] = useState(false);
  const [selectedCSSubject, setSelectedCSSubject] = useState("");
  const [selectedCSCourse, setSelectedCSCourse] = useState("");
  const [selectedCSInstructor, setSelectedCSInstructor] = useState("");
  const [selectedCSLocation, setSelectedCSLocation] = useState("");
  const [filteredCSCourses, setFilteredCSCourses] = useState([]);
  const [checkedCSCourses, setCheckedCSCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]); // TODO Save selected courses to local cache so they persist over user sessions

  const calculateHours = () => {
    let hours = 0;
    selectedCourses.forEach(course => {
      hours += (course.credit.includes('-') ? parseInt(course.credit.split('-')[1]) : parseInt(course.credit));
    });
    return hours;
  };

  const resetCheckedCourses = () => {
    for (let course of checkedCSCourses) {
      course.checked = false;
    };
    setCheckedCSCourses([]);
  };

  const handleCSModal = (open) => {
    if (open) {
      setCourseSelectionModalOpen(true);
    } else {
      setCourseSelectionModalOpen(false);
      setSelectedCSCourse("");
      setSelectedCSInstructor("");
      setSelectedCSSubject("");
      setFilteredCSCourses([]);
      resetCheckedCourses();
    }
  }

  const handleCSSearch = () => {
    setFilteredCSCourses(generalizeCourses(courses.filter(course => (
      (course.subject === selectedCSSubject) || (selectedCSSubject === ""))
      && ((course.instructor === selectedCSInstructor) || (selectedCSInstructor === ""))
      && ((course.courseNumber === selectedCSCourse) || (selectedCSCourse === ""))
      && (((selectedCSLocation === "ONLINE") ? (course.location === selectedCSLocation) : (course.location !== "ONLINE")) || (selectedCSLocation === ""))
    )));
  };

  const [isCSAboutModalOpen, setCSAboutModalOpen] = useState(false);
  const [selectedCSAboutCourse, setSelectedCSAboutCourse] = useState({});
  const handleCSAboutModal = (open, selectedCourse) => {
    if (open) {
      setSelectedCSAboutCourse(selectedCourse);
      setCSAboutModalOpen(open);
    } else {
      setCSAboutModalOpen(open);
      setSelectedCSAboutCourse({});
    }

  };

  const [isCSSectionModalOpen, setCSSectionModalOpen] = useState(false);
  const [selectedCSGeneralCourse, setSelectedCSGeneralCourse] = useState({});
  const handleCSSectionModal = (open, generalCourse) => {
    if (open) {
      setSelectedCSGeneralCourse(generalCourse);
      setCSSectionModalOpen(open);
    } else {
      setCSSectionModalOpen(open);
      setSelectedCSGeneralCourse({});
    }
  };

  const checkCourse = (course, isChecked) => {
    if (course.title === undefined) {
      return;
    }
    if (isChecked && !checkedCSCourses.includes(course)) {
      setCheckedCSCourses([...checkedCSCourses, course]);
    } else if (!isChecked && checkedCSCourses.includes(course)) {
      setCheckedCSCourses(checkedCSCourses.filter(c => c.title + c.courseNumber !== course.title + course.courseNumber));
    }
  }

  const addCheckedCourses = () => {
    checkedCSCourses.forEach(course => {
      course.checked = false;
      if (selectedCourses.find(c => c.title + c.courseNumber === course.title + course.courseNumber) == undefined) {
        selectedCourses.push(course)
      }
    });
    resetCheckedCourses();
    handleCSModal(false);
  };

  const removeSelectedCourses = (courseIDs) => {
    for (let courseID of courseIDs) {
      setSelectedCourses(selectedCourses.filter(c => c.id !== courseID));
    }
  }

  const handleScheduleSelection = (schedule) => {
    setSelectedSchedule(schedule);
    setPreviewScheduleModalOpen(false);
  }

  const [currentSchedule, setCurrentSchedule] = useState([]);
  const [possibleSchedules, setPossibleSchedules] = useState([]);

  const generatePossibleSchedules = () => {
    let combinations = [];

    selectedCourses.forEach(course => {
      const courseSections = courses.filter(section => course.title + course.courseNumber === section.title + section.courseNumber);

      if (courseSections.length > 0) {
        if (combinations.length === 0) {
          combinations = courseSections.map(section => [section]);
        } else {
          const newCombinations = [];
          combinations.forEach(combination => {
            courseSections.forEach(section => {
              newCombinations.push([...combination, section]);
            });
          });
          combinations = newCombinations;
        }
      }
    });
    setPossibleSchedules(combinations);
  }

  const getRecommendedCourses = async () => {
    setStudentRecommendations(typeof sampleSchedules[0] === 'undefined' ? new Array(1)
      : (userInfo.year == 1
        ? (selectedTerm.name === 'Spring 2024'
          ? sampleSchedules[0].academicYears.Freshman.springCourses
          : sampleSchedules[0].academicYears.Freshman.fallCourses)
        : (selectedTerm.name === 'Spring 2024'
          ? sampleSchedules[0].academicYears.Sophomore.springCourses
          : sampleSchedules[0].academicYears.Sophomore.fallCourses)));
  }

  return (
    <div className="Dashboard">
      <DashNavbar logout={handleLogout} userName={userInfo.name} handleProfileModal={setProfileModalOpen} />
      <ProfileModal userInfo={userInfo} isOpen={isProfileModalOpen} handleProfileModal={setProfileModalOpen} />
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
                          <option key={index} value={term.id} defaultValue={selectedTerm.id}>{term.name}</option>
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
                <Button variant="light" size="sm" href="mailto:advisor@uab.edu?subject=Advising%20help">Contact advisor</Button>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div className="courses-container" style={{ display: 'flex', marginTop: '1rem', marginBottom: '1rem', textAlign: 'left' }}>
          <Card style={{ width: '100%', marginRight: '0.5rem', marginLeft: '1rem', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: "#1b604a", color: "#fff" }}>
            <Card.Title style={{ fontSize: '1.8rem', fontWeight: 'bold', display: 'flex', marginBottom: '0px', padding: '1rem', paddingBottom: '0px' }}>
              <p style={{ marginBottom: '0px', paddingBottom: '0px' }}>Selected Courses</p>
              <div style={{ marginLeft: 'auto', alignSelf: 'flex-start', textAlign: 'center', backgroundColor: "#0f3b2d", borderRadius: '4px' }}>
                <p style={{ fontSize: '20px', marginBottom: '0px', paddingBottom: '0px', color: calculateHours() >= 18 ? "#f33" : 'inherit' }}>{calculateHours()}</p>
                <p style={{ fontSize: '12px', marginBottom: '0px', paddingRight: '0.2rem', paddingLeft: '0.2rem', fontWeight: 'normal' }}>Credit Hours</p>
              </div>
            </Card.Title>
            <Card.Body style={{ paddingTop: '0.4rem' }}>
              <SelectedCourseList selectedCourses={selectedCourses} removeCourses={removeSelectedCourses} viewCourseSections={handleCSSectionModal} viewCourseAbout={handleCSAboutModal} />
              <Button variant="light" size="sm" style={{ width: '100%' }} onClick={() => handleCSModal(true)}><Add />Add course</Button>
              <Modal size="xl" show={isCourseSelectionModalOpen} onHide={() => handleCSModal(false)} backdrop="static" centered>
                <Modal.Dialog style={{
                  display: 'flex', width: '100%', margin: '0px', fontFamily: 'Inter, sans-serif',
                }}>
                  <Modal.Header closeButton>
                    <Modal.Title>Select Course</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>

                    <InputGroup className="mb-1">
                      <Form.Select aria-label="Subject filter selection" onChange={(e) => setSelectedCSSubject(e.target.value)}>
                        <option value="">Select Subject</option>
                        <option value="">Any Subject</option>
                        {Array.from(new Set(courses.map(course => course.subject))).map((subject, id) => (
                          <option key={id} value={subject}>{subject}</option>
                        ))}
                      </Form.Select>
                      <Form.Control type="number" placeholder="Search by course number" onChange={(e) => setSelectedCSCourse(e.target.value)} />
                    </InputGroup>

                    <InputGroup className="mb-1">
                      <Form.Select aria-label="Instructor filter selection" onChange={(e) => setSelectedCSInstructor(e.target.value)}>
                        <option value="">Select Instructor</option>
                        <option value="">Any Instructor</option>
                        {Array.from(new Set(courses.map(course => course.instructor))).map((instructor, id) => (
                          <option key={id} value={instructor}>{instructor}</option>
                        ))}
                      </Form.Select>

                      <Form.Select aria-label="Location filter selection" onChange={(e) => setSelectedCSLocation(e.target.value)}>
                        <option value="">Select Location</option>
                        <option value="ONLINE">Online</option>
                        <option value="INPERSON">In-person</option>
                        <option value="">Both</option>
                      </Form.Select>
                    </InputGroup>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                      <Button variant="dark" size="md" onClick={handleCSSearch} style={{ width: '8rem', height: '2.5rem' }}>🔎 Search</Button>
                    </div>

                    <div style={{ width: '100%', height: '1px', backgroundColor: '#dee2e6', margin: '0.5rem 0' }} />
                    <Accordion style={{ width: "100%" }}>
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>Checked Courses</Accordion.Header>
                        <Accordion.Body>
                          <CSModalCourseList courses={checkedCSCourses} checkCourse={checkCourse} viewCourse={handleCSSectionModal} isSmallView={true} isGeneralView={true} />
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                    <div style={{ width: '100%', height: '1px', backgroundColor: '#dee2e6', margin: '0.5rem 0' }} />

                    <CSModalCourseList courses={filteredCSCourses} checkCourse={checkCourse} viewCourse={handleCSSectionModal} isSmallView={false} isGeneralView={true} />
                  </Modal.Body>

                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCSModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={addCheckedCourses}>Add Checked Courses</Button>
                  </Modal.Footer>
                </Modal.Dialog>
              </Modal>

              <Modal size="lg" show={isCSSectionModalOpen} onHide={() => handleCSSectionModal(false)} centered>
                <Modal.Dialog style={{
                  width: '100%', margin: '0px', fontFamily: 'Inter, sans-serif',
                }}>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      Sections for {selectedCSGeneralCourse.subject} {selectedCSGeneralCourse.courseNumber}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <CSModalCourseList courses={courses.filter(course => course.subject === selectedCSGeneralCourse.subject && course.courseNumber === selectedCSGeneralCourse.courseNumber)} checkCourse={checkCourse} viewCourse={handleCSAboutModal} isSmallView={true} isGeneralView={false} />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCSSectionModal(false)}>Close</Button>
                    <Button variant="primary" onClick={checkCourse(selectedCSGeneralCourse, true)}>Check Course</Button>
                  </Modal.Footer>
                </Modal.Dialog>
              </Modal>

              <Modal size="md" show={isCSAboutModalOpen} onHide={() => handleCSAboutModal(false)} centered>
                <Modal.Dialog style={{
                  display: 'flex', width: '100%', margin: '0px', fontFamily: 'Inter, sans-serif',
                }}>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      {selectedCSAboutCourse.subject} {selectedCSAboutCourse.courseNumber} ({selectedCSAboutCourse.section}) - {selectedCSAboutCourse.title}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p><b>Instructor:</b> {selectedCSAboutCourse.instructor}</p>
                    <p><b>Capacity:</b> {selectedCSAboutCourse.capacity} &emsp; <b>Enrolled:</b> {selectedCSAboutCourse.enrolled} &emsp; <b>Remaining:</b> {selectedCSAboutCourse.remaining}  </p>
                    <p><b>Credit Hours:</b> {selectedCSAboutCourse.credit}</p>
                    <p><b>Days:</b> {selectedCSAboutCourse.days} &emsp; <b>Time:</b> {selectedCSAboutCourse.time} &emsp; <b>Location:</b> {selectedCSAboutCourse.location}</p>
                    <p><b>Course Length:</b> {selectedCSAboutCourse.dateRange}</p>
                  </Modal.Body>
                </Modal.Dialog>
              </Modal>

            </Card.Body>
          </Card>
          <Card style={{ width: '100%', marginRight: '1rem', marginLeft: '0.5rem', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: "#1b604a", color: "#fff" }}>
            <Card.Body>
              <Card.Title style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>Recommended Courses</Card.Title>
              <Card.Text>
                <Button variant="light" size="sm" onClick={getRecommendedCourses}>View recommendations</Button>
              </Card.Text>
              <RecCourseList recCourses={studentRecommendations} viewCourseSections={handleCSSectionModal} />
            </Card.Body>
          </Card>
        </div>

        <div className="schedules-container" style={{ display: 'flex', marginTop: '1rem', marginBottom: '1rem', textAlign: 'left' }}>
          <Card style={{ width: '100%', marginRight: '0.5rem', marginLeft: '1rem', boxShadow: '0px 4px 8px rgba</div>(0, 0, 0, 0.1)', backgroundColor: "#1b604a", color: "#fff" }}>
            <Card.Body>
              <Card.Title style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>Chosen Schedule</Card.Title>
              {selectedSchedule.length > 0 ? <Calendar courses={selectedSchedule} /> : <Card.Text>  No schedule chosen! </Card.Text>}
            </Card.Body>
          </Card>
          <Card style={{ width: '100%', marginRight: '1rem', marginLeft: '0.5rem', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: "#1b604a", color: "#fff" }}>
            <Card.Body>
              <Card.Title style={{ fontSize: '1.8rem', fontWeight: 'bold', display: 'flex' }}>
                <p style={{ marginBottom: '4px' }}>Possible Schedules</p>
                <Button variant="light" size="sm" style={{ marginLeft: 'auto', alignSelf: 'flex-start' }} onClick={generatePossibleSchedules}>
                  <Refresh /> Refresh
                </Button>
              </Card.Title>
              {selectedCourses.length > 0 ? <ScheduleList setModal={handleSchedulePreviewModal} possibleSchedules={possibleSchedules} /> : <Card.Text>No courses selected!</Card.Text>}
              <Modal size="xl" show={isPreviewScheduleModalOpen} onHide={() => setPreviewScheduleModalOpen(false)} centered>
                <Modal.Dialog style={{
                  display: 'flex', width: '100%', margin: '0px', fontFamily: 'Inter, sans-serif',
                }}>
                  <Modal.Header closeButton>
                    <Modal.Title>Preview Schedule</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Calendar courses={selectedPreviewSchedule} />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="primary" onClick={() => handleScheduleSelection(selectedPreviewSchedule)}>Choose Schedule</Button>
                    <Button variant="secondary" onClick={() => setPreviewScheduleModalOpen(false)}>Cancel</Button>
                  </Modal.Footer>
                </Modal.Dialog>
              </Modal>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Dashboard
