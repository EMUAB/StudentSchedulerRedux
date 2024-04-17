import React, { useState, useEffect } from 'react'
import { Button, Card, Accordion } from 'react-bootstrap'
import DashNavbar from './Navbar.jsx'
import { CSModalCourseList, SelectedCourseList } from './CoursesList.jsx'
import { logout } from '../AuthService'

const AdminPage = () => {
  const [selectedCourses, setSelectedCourses] = useState([])

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch('/api/courses');
      const data = await response.json();
      setCourses(data.map(course => ({ ...course, checked: false })));
      console.log(data);
    };

    fetchCourses();
  }, []);

  const handleLogout = () => {
    logout()
    window.location.reload()
  }

  return (
    <div className="AdminPage">
      <DashNavbar logout={handleLogout} />
      <div className="hello-container" style={{ backgroundColor: '#1e6b52', color: '#fff', padding: '1rem', display: 'flex', justifyContent: 'pace-between', alignItems: 'center' }}>
        <h2>Hello, Professor!</h2>
      </div>
      <div className="card-divs">
        <div className="courses-container" style={{ display: 'flex', marginTop: '1rem', marginBottom: '1rem', textAlign: 'left' }}>
          <Card style={{ width: '100%', marginRight: '0.5rem', marginLeft: '1rem', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: "#1b604a", color: "#fff" }}>
            <Card.Body>
              <Card.Title style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>Selected Courses</Card.Title>
              <Card.Text>
                <SelectedCourseList selectedCourses={selectedCourses} />
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AdminPage