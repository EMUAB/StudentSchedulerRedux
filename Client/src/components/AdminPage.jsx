import React, { useState, useEffect } from 'react';
import { Button, Card, Modal, Form, InputGroup } from 'react-bootstrap';
import DashNavbar from './Navbar';
import { CSModalCourseList, SelectedCourseList } from './CoursesList';
import { logout } from '../AuthService';

const AdminPage = () => {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [isCourseSelectionModalOpen, setCourseSelectionModalOpen] = useState(false);
    const [showCourseDialog, setShowCourseDialog] = useState(false);
    const [courseDialogMode, setCourseDialogMode] = useState('add'); // 'add', 'edit', 'delete'
    const [currentCourse, setCurrentCourse] = useState({
        id: '',
        subject: '',
        instructor: '',
        courseNumber: '',
        location: ''
    });

    const [selectedSubject, setSelectedSubject] = useState("");
    const [selectedInstructor, setSelectedInstructor] = useState("");
    const [selectedCourseNumber, setSelectedCourseNumber] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");

    useEffect(() => {
        const fetchCourses = async () => {
            const response = await fetch('/api/courses');
            const data = await response.json();
            setCourses(data);
            setFilteredCourses(data);
        };
        fetchCourses();
    }, []);


    const openCourseDialog = (mode, course = {
        id: '',
        subject: '',
        instructor: '',
        courseNumber: '',
        location: ''
    }) => {
        setCourseDialogMode(mode);
        setCurrentCourse(course);
        setShowCourseDialog(true);
    };

    const handleCourseSave = async () => {
        const apiUrl = `/api/courses/${courseDialogMode === 'add' ? '' : currentCourse.id}`;
        const method = courseDialogMode === 'add' ? 'POST' : 'edit' ? 'PUT' : 'DELETE';
        const headers = { 'Content-Type': 'application/json' };
        const body = JSON.stringify(currentCourse);

        try {
            const response = await fetch(apiUrl, { method, headers, body: courseDialogMode !== 'delete' ? body : undefined });
            if (response.ok) {
                const updatedCourses = await response.json();
                setCourses(updatedCourses);
                setFilteredCourses(updatedCourses);
                setShowCourseDialog(false);
                setCourseSelectionModalOpen(false);
            } else {
                throw new Error('Failed to perform the operation');
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const handleCourseModal = (open) => {
        setCourseSelectionModalOpen(open);
        if (!open) {
            setShowCourseDialog(false);
        }
    };

    const filterCourses = () => {
        console.log("Filtering with:", { selectedSubject, selectedInstructor, selectedCourseNumber, selectedLocation });
        const result = courses.filter(course =>
            (course.subject === selectedSubject || selectedSubject === "") &&
            (course.instructor === selectedInstructor || selectedInstructor === "") &&
            (course.courseNumber.toString() === selectedCourseNumber.toString() || selectedCourseNumber === "") &&
            (course.location === selectedLocation || selectedLocation === "")
        );
        console.log("Filtered Results:", result);
        setFilteredCourses(result);
    };


    return (
        <div className="AdminPage">
            <DashNavbar logout={logout}/>
            <div className="hello-container" style={{
                backgroundColor: '#1e6b52',
                color: '#fff',
                padding: '1rem',
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'center'
            }}>
                <h2>Hello, Professor!</h2>
            </div>
            <div className="card-divs">
                <Card>
                    <Card.Body>
                        <Button variant="light" size="sm" style={{width: '100%'}}
                                onClick={() => handleCourseModal(true)}>
                            Edit Courses
                        </Button>
                    </Card.Body>
                </Card>
                <Modal size="xl" show={isCourseSelectionModalOpen} onHide={() => handleCourseModal(false)}
                       backdrop="static" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Courses</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup className="mb-3">
                            <Form.Select aria-label="Subject filter" onChange={(e) => setSelectedSubject(e.target.value)}>
                                <option value="">Select Subject</option>
                                {Array.from(new Set(courses.map(course => course.subject))).sort().map((subject, index) => (
                                    <option key={index} value={subject}>{subject}</option>
                                ))}
                            </Form.Select>
                            <Form.Control type="text" placeholder="Search by course number"
                                          onChange={(e) => setSelectedCourseNumber(e.target.value)}/>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <Form.Select aria-label="Instructor filter" onChange={(e) => setSelectedInstructor(e.target.value)}>
                                <option value="">Select Instructor</option>
                                {Array.from(new Set(courses.map(course => course.instructor))).sort().map((instructor, index) => (
                                    <option key={index} value={instructor}>{instructor}</option>
                                ))}
                            </Form.Select>

                            <Form.Select aria-label="Location filter" onChange={(e) => setSelectedLocation(e.target.value)}>
                                <option value="">Select Location</option>
                                {Array.from(new Set(courses.map(course => course.location))).sort().map((location, index) => (
                                    <option key={index} value={location}>{location}</option>
                                ))}
                            </Form.Select>
                        </InputGroup>
                        <Button onClick={filterCourses} variant="primary">Search</Button>
                        <CSModalCourseList courses={filteredCourses.sort()} isSmallView={false}/>
                        <Button onClick={() => openCourseDialog('add')} variant="light" style={{marginLeft: '1rem'}}>Add
                            Course</Button>
                        <Button onClick={() => openCourseDialog('edit', currentCourse)} variant="light"
                                style={{marginLeft: '1rem'}}>Edit Course</Button>
                        <Button onClick={() => openCourseDialog('delete', currentCourse)} variant="light"
                                style={{marginLeft: '1rem'}}>Delete Course</Button>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => handleCourseModal(false)}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showCourseDialog} onHide={() => setShowCourseDialog(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{courseDialogMode.charAt(0).toUpperCase() + courseDialogMode.slice(1)} Course</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Subject</Form.Label>
                                <Form.Control type="text" placeholder="Enter subject" name="subject"
                                              value={currentCourse.subject} onChange={e => setCurrentCourse({
                                    ...currentCourse,
                                    subject: e.target.value
                                })}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Instructor</Form.Label>
                                <Form.Control type="text" placeholder="Enter instructor" name="instructor"
                                              value={currentCourse.instructor} onChange={e => setCurrentCourse({
                                    ...currentCourse,
                                    instructor: e.target.value
                                })}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Course Number</Form.Label>
                                <Form.Control type="text" placeholder="Enter course number" name="courseNumber"
                                              value={currentCourse.courseNumber} onChange={e => setCurrentCourse({
                                    ...currentCourse,
                                    courseNumber: e.target.value
                                })}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Location</Form.Label>
                                <Form.Control type="text" placeholder="Enter location" name="location"
                                              value={currentCourse.location} onChange={e => setCurrentCourse({
                                    ...currentCourse,
                                    location: e.target.value
                                })}/>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowCourseDialog(false)}>Cancel</Button>
                        <Button variant="primary"
                                onClick={handleCourseSave}>{courseDialogMode === 'delete' ? 'Delete' : 'Save'}</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default AdminPage;
