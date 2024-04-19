import React, { useState, useEffect } from 'react';
import { Button, Card, Modal, Form, InputGroup } from 'react-bootstrap';
import DashNavbar from './Navbar';
import { CSModalCourseList, SelectedCourseList } from './CoursesList';
import { logout } from '../AuthService';

const AdminPage = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [isCourseSelectionModalOpen, setCourseSelectionModalOpen] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [selectedCourseNumber, setSelectedCourseNumber] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch('/api/courses');
      const data = await response.json();
      setCourses(data.map(course => ({ ...course, checked: false })));
      setFilteredCourses(data);
    };
    fetchCourses();
  }, []);

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  const handleCourseModal = (open) => {
    setCourseSelectionModalOpen(open);
  };

  const filterCourses = () => {
    const result = courses.filter(course =>
      (course.subject === selectedSubject || selectedSubject === "") &&
      (course.instructor === selectedInstructor || selectedInstructor === "") &&
      (course.courseNumber.toString() === selectedCourseNumber || selectedCourseNumber === "") &&
      (course.location === selectedLocation || selectedLocation === "")
    );
    setFilteredCourses(result);
  };

  const uniqueSubjects = Array.from(new Set(courses.map(course => course.subject))).sort();
  const uniqueInstructors = Array.from(new Set(courses.map(course => course.instructor))).sort();
  const uniqueLocations = Array.from(new Set(courses.map(course => course.location))).sort();

  return (
    <div className="AdminPage">
      <DashNavbar logout={handleLogout} />
      <div className="hello-container" style={{ backgroundColor: '#1e6b52', color: '#fff', padding: '1rem', display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
        <h2>Hello, Admin!</h2>
      </div>
      <div className="card-divs">
        <Card style={{ width: '100%', margin: '1rem', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: "#1b604a", color: "#fff" }}>
          <Card.Body>
            <Card.Title style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>Courses</Card.Title>
            <SelectedCourseList selectedCourses={selectedCourses} />
            <Button variant="light" size="sm" style={{ width: '100%' }} onClick={() => handleCourseModal(true)}>
              Edit Course
            </Button>
            <Modal size="xl" show={isCourseSelectionModalOpen} onHide={() => handleCourseModal(false)} backdrop="static" centered>
              <Modal.Header closeButton>
                <Modal.Title>Select Courses</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <InputGroup className="mb-3">
                  <Form.Select aria-label="Subject filter" onChange={(e) => setSelectedSubject(e.target.value)}>
                    <option value="">Select Subject</option>
                    {uniqueSubjects.map((subject, index) => (
                      <option key={index} value={subject}>{subject}</option>
                    ))}
                  </Form.Select>
                  <Form.Control type="text" placeholder="Search by course number" onChange={(e) => setSelectedCourseNumber(e.target.value)} />
                </InputGroup>
                <InputGroup className="mb-3">
                  <Form.Select aria-label="Instructor filter" onChange={(e) => setSelectedInstructor(e.target.value)}>
                    <option value="">Select Instructor</option>
                    {uniqueInstructors.map((instructor, index) => (
                      <option key={index} value={instructor}>{instructor}</option>
                    ))}
                  </Form.Select>
                  <Form.Select aria-label="Location filter" onChange={(e) => setSelectedLocation(e.target.value)}>
                    <option value="">Select Location</option>
                    {uniqueLocations.map((location, index) => (
                      <option key={index} value={location}>{location}</option>
                    ))}
                  </Form.Select>
                </InputGroup>
                <Button onClick={filterCourses} variant="primary">Filter</Button>
                <CSModalCourseList courses={filteredCourses} isSmallView={false} />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => handleCourseModal(false)}>Cancel</Button>
              </Modal.Footer>
            </Modal>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default AdminPage;
