import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CourseManager = () => {
    // state to hold our list of courses
    const [courses, setCourses] = useState([]);
    // state to hold the GPA number
    const [gpa, setGpa] = useState(0);

    // This function calls your Spring Boot API
    const fetchData = async () => {
        try {
            const courseResponse = await axios.get("http://localhost:8080/course");
            const gpaResponse = await axios.get("http://localhost:8080/course/gpa");
            
            setCourses(courseResponse.data);
            setGpa(gpaResponse.data);
        } catch (error) {
            console.error("Error fetching data from Spring Boot:", error);
        }
    };

    // useEffect is like Django's 'ready()' - it runs when the component loads
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h2>Dashboard</h2>
            <div style={{ background: '#f4f4f4', padding: '10px', borderRadius: '8px' }}>
                <h3>Total GPA: {gpa.toFixed(2)}</h3>
            </div>

            <h4>Your Courses</h4>
            <ul>
                {courses.length > 0 ? (
                    courses.map(course => (
                        <li key={course.id}>
                            {course.courseCode}: {course.courseName} - <strong>{course.grade}</strong>
                        </li>
                    ))
                ) : (
                    <p>No courses found. Add one in the backend!</p>
                )}
            </ul>
        </div>
    );
};

export default CourseManager;