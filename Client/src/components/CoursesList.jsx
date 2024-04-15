import { React, useState } from 'react'
import { Button, Pagination, Form } from 'react-bootstrap';
import { Visibility, Info } from '@mui/icons-material';


const CoursesList = ({ courses, addCourse }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 10;

    const renderCourses = () => {
        const indexOfLastCourse = currentPage * coursesPerPage;
        const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
        const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

        const courseElements = [];
        currentCourses.forEach(course => {
            courseElements.push(
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#ffe',
                        color: '#000',
                        borderRadius: '8px',
                        border: '1px solid #c4c8cb',
                        padding: '4px',
                        marginBottom: '2px',
                        width: '100%',
                    }}
                    key={course.id}
                >
                    <div style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        padding: '0 4px 0 8px',
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        height: '3rem',
                    }}>
                        <Form.Check aria-label={`check-course-${course.subject}-${course.courseNumber}-${course.section}`} />
                        <div style={{ padding: '0px 1rem', display: 'flex', width: '100%', flexDirection: 'column' }}>
                            <p style={{ marginBottom: '-4px', fontSize: '20px' }}> {course.subject} {course.courseNumber} ({course.section})</p>
                            <p style={{ marginBottom: '0px', fontSize: '14px' }}> {course.title} - {course.instructor}</p>
                        </div>
                        <div style={{ width: '30%' }}>
                            <p style={{ marginBottom: '-4px', fontSize: '20px' }}> {course.days}</p>
                            <p style={{ marginBottom: '0px', fontSize: '14px' }}> {course.time}</p>
                        </div>
                        <div onClick={() => viewCourse(course.id)} style={{ cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: 'auto', marginRight: '4px' }}>
                            <Info />
                            About
                        </div>
                    </div>
                </div>
            );
        });
        return courseElements;
    };

    const pageNumbers = [];
    const totalPages = Math.ceil(courses.length / coursesPerPage);
    const paginate = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        setCurrentPage(pageNumber);
    };

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
            <Pagination.Item
                key={i}
                active={i === currentPage}
                onClick={() => paginate(i)}
            >
                {i}
            </Pagination.Item>
        );
    }

    return (
        <div style={{ borderRadius: '2px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {renderCourses()}
            {courses.length === 0 && <div style={{ padding: '1rem' }}>No courses found</div>}
            <Pagination style={{ paddingTop: '1rem' }}>
                <Pagination.First onClick={() => paginate(1)} />
                <Pagination.Prev onClick={() => paginate(currentPage - 1)} />
                {pageNumbers}
                <Pagination.Next onClick={() => paginate(currentPage + 1)} />
                <Pagination.Last onClick={() => paginate(totalPages)} />
            </Pagination>
        </div>
    );
}



export default CoursesList;