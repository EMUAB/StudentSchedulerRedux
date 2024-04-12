import React, { useState, useEffect } from 'react';

const Courses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        // Fetch courses from your backend
        const fetchCourses = async () => {
            const response = await fetch('/courses'); // Adjust endpoint as necessary
            const data = await response.json();
            console.log(data); // Print data to console
            setCourses(data);
            // console.log(data); // Print data to console
        };

        fetchCourses();
    }, []);

    return (
        <div>
            <h2>Courses</h2>
            {courses.length > 0 ? (
                <ul>
                    {courses.map((course) => (
                        <li key={course.id}>{course.title} - {course.instructor}</li>
                    ))}
                </ul>
            ) : (
                <p>You are logged in but there are no courses to display.</p>
            )}
        </div>
    );
};

export default Courses;