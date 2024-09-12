import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCourses } from '../utils/courseService';

const CourseListPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);  // Data is already the payload array
      } catch (error) {
        setError('Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  
  return (
    <div className="course-list p-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <div key={course.courseId} className="course-item bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
          <p className="text-gray-700">{course.description}</p>
          <Link to={`/courses/${course.courseId}`} className="text-blue-500 hover:underline">
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CourseListPage;
