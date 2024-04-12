import { React, useState } from 'react'
import { Button, Pagination } from 'react-bootstrap';


const CoursesList = ({ courses }) => {

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
                        borderRadius: '4px',
                        padding: '4px',
                        marginBottom: '2px',
                        height: '2em'
                    }}
                    key={course.id}
                >
                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingLeft: '4px', paddingRight: '8px' }}>
                        {course.subject} {course.title} {course.section} {course.location} {course.instructor} {course.time} {course.credit} {course.capacity} {course.enrolled}
                        <Button variant="primary" size="sm" style={{ marginLeft: 'auto', marginRight: '4px' }}>Add</Button>
                    </div>
                </div>
            );
        });
        return courseElements;
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const pageNumbers = [];
    const totalPages = Math.ceil(courses.length / coursesPerPage);
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
            <Pagination.Item
                key={i}
                active={i === currentPage}
                onClick={() => setCurrentPage(i)}
            >
                {i}
            </Pagination.Item>
        );
    }

    return (
        <div style={{ borderRadius: '2px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {renderCourses()}
            <Pagination style={{ paddingTop: '1rem' }}>
                <Pagination.First onClick={() => setCurrentPage(1)} />
                <Pagination.Prev onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} />
                {pageNumbers}
                <Pagination.Next onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} />
                <Pagination.Last onClick={() => setCurrentPage(totalPages)} />
            </Pagination>
        </div>
    );
}



export default CoursesList;