import { React, useState } from 'react'
import { Pagination, Form, Button } from 'react-bootstrap';
import { Info, CalendarMonth } from '@mui/icons-material';


export const CSModalCourseList = ({ courses, checkCourse, viewCourse, isSmallView, isGeneralView, isAdminView, adminFunction }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = (isSmallView ? 20 : 10);

    const handleCheck = (course, checkStatus) => {
        course.checked = !course.checked;
        checkCourse(course, course.checked);
    };

    const renderCourses = () => {
        const indexOfLastCourse = currentPage * coursesPerPage;
        const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;

        const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

        const courseElements = [];
        currentCourses.forEach(course => {
            console.log(course);
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
                    key={isGeneralView ? course.title + course.courseNumber : course.id}
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
                        {isGeneralView ?
                            <Form.Check type={"checkbox"} >
                                <Form.Check.Input
                                    aria-label={`check-course-${course.subject}-${course.courseNumber}-${course.section}`}
                                    checked={course.checked}
                                    onChange={() => handleCheck(course)}
                                />
                            </Form.Check>
                            : null}

                        <div style={{ padding: '0px 1rem', display: 'flex', width: '100%', flexDirection: 'column' }}>
                            <p style={{ marginBottom: '-4px', fontSize: '20px' }}> {course.subject} {course.courseNumber} {isGeneralView ? null : `(${course.section})`} </p>
                            <p style={{ marginBottom: '0px', fontSize: '14px' }}> {isGeneralView ? course.title : null} {isGeneralView ? null : course.instructor} </p>
                        </div>
                        {isGeneralView ? null
                            : <>
                                <div style={{ width: '100%' }}>
                                    <p style={{ marginBottom: '-4px', fontSize: '20px' }}> {course.days}</p>
                                    <p style={{ marginBottom: '0px', fontSize: '14px' }}> {course.time}</p>
                                </div>
                                <div>
                                    <p style={{ marginBottom: '-4px', fontSize: '20px', paddingRight: '3rem' }}> {course.credit}</p>
                                    <p style={{ marginBottom: '0px', fontSize: '14px' }}> Hours</p>
                                </div>
                            </>}
                        {isAdminView ?
                            <div style={{display: 'flex'}}>
                                <Button variant='dark' size='sm' style={{fontWeight: 'bold', marginRight: '0.5rem'}} onClick={() => adminFunction('edit', course)}>Edit</Button>
                                <Button variant='danger' size='sm' style={{ fontWeight: 'bold' }} onClick={() => adminFunction('delete', course)}>Delete</Button>
                            </div>
                            :
                            <div onClick={() => viewCourse(true, course)} style={{ cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: 'auto', marginRight: '4px' }}>
                                {isGeneralView ? <><CalendarMonth />Times</> : <><Info /> About</>}
                            </div>}
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

    const smallView = () => { // Easy rendering for checked courses
        return (
            <div style={{ borderRadius: '2px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {renderCourses()}
                {courses.length === 0 ? <div style={{ padding: '1rem' }}>Check a course to add it here!</div> : null}
            </div>
        );
    }

    const bigView = () => {
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

    return (
        <div>
            {isSmallView ? smallView() : bigView()}
        </div>
    );
}

export const SelectedCourseList = ({ selectedCourses, removeCourses, viewCourseSections }) => {
    const [markedCourses, setMarkedCourses] = useState([]);

    const markCourseForRemoval = (course, checked) => {
        if (checked) {
            setMarkedCourses(prevCourses => [...prevCourses, course]);
        } else {
            setMarkedCourses(prevCourses => prevCourses.filter(c => c !== course));
        }
        console.log(markedCourses);
    };

    const handleCourseRemoval = () => {
        removeCourses(markedCourses);
        for (let course of markedCourses) {
            setMarkedCourses(prevCourses => prevCourses.filter(c => c !== course));
        }
    };

    const courseElements = [];
    selectedCourses.forEach(course => {
        courseElements.push(
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#ffe',
                    color: '#000',
                    borderRadius: '8px',
                    padding: '4px',
                    marginBottom: '2px',
                    width: '100%',
                }}
                key={course.title + course.courseNumber}
            >
                <div style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    padding: '0 4px 0 2px',
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    height: '3rem',
                }}>
                    <Form.Check type={"checkbox"} >
                        <Form.Check.Input
                            aria-label={`mark-course-${course.subject}-${course.courseNumber}-${course.section}`}
                            defaultChecked={false}
                            type={"checkbox"}
                            onChange={(e) => markCourseForRemoval(course.id, e.target.checked)} />
                    </Form.Check>
                    <div style={{ padding: '0px 1rem 0 0.5rem', display: 'flex', width: '100%', flexDirection: 'column' }}>
                        <p style={{ marginBottom: '-4px', fontSize: '20px' }}> {course.subject} {course.courseNumber}</p>
                        <p style={{ marginBottom: '0px', fontSize: '14px' }}> {course.title}</p>
                    </div>

                    <div style={{ fontSize: '12px', fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: 'auto', marginRight: '0.8rem' }}>
                        <p style={{ margin: '1rem 0 0 0', fontSize: '20px' }}>{course.credit}</p>
                        <p style={{ margin: '-0.4rem 0 1rem 0', fontSize: '12px' }}>Hours</p>
                    </div>
                    <div onClick={() => viewCourseSections(true, course)} style={{ cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: 'auto', marginRight: '0.8rem' }}>
                        <CalendarMonth />
                        Times
                    </div>
                </div>
            </div>
        );
    });
    return (
        <div style={{ borderRadius: '2px', display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
            <Button variant='danger' size='sm' style={{ display: markedCourses.length > 0 ? 'flex' : 'none', marginBottom: '0.5rem' }} onClick={handleCourseRemoval}>Delete</Button>
            {courseElements}
        </div>
    );

};

export const RecCourseList = ({ recCourses, selectCourse, viewCourseSections }) => {
    if (recCourses.length < 1) {
        return <div style={{ padding: '1rem' }}>Refresh to load</div>;
    }
    const courseElements = [];
    recCourses.forEach(course => {
        courseElements.push(
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#ffe',
                    color: '#000',
                    borderRadius: '8px',
                    padding: '4px',
                    marginBottom: '2px',
                    width: '100%',
                }}
                key={course.name}>
                <div style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    padding: '0 4px 0 2px',
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    height: '3rem',
                }}>
                    <div style={{ padding: '0px 1rem 0 0.5rem', display: 'flex', width: '100%', flexDirection: 'column' }}>
                        <p style={{ marginBottom: '-4px', fontSize: '20px' }}> {course.name} </p>
                    </div>

                    <div style={{ fontSize: '12px', fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: 'auto', marginRight: '0.8rem' }}>
                        <p style={{ margin: '1rem 0 0 0', fontSize: '20px' }}>{course.hours}</p>
                        <p style={{ margin: '-0.4rem 0 1rem 0', fontSize: '12px' }}>Hours</p>
                    </div>
                    {/* <div onClick={() => viewCourseSections(true, course)} style={{ cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: 'auto', marginRight: '0.8rem' }}>
                        <CalendarMonth />
                        Times
                    </div> */}
                </div>
            </div>
        );
    });
    return (
        <div style={{ borderRadius: '2px', display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
            {courseElements}
        </div>
    );
};