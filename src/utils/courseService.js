// services/courseService.js
import axios from 'axios';

const API_BASE_URL = 'https://localhost:8080/api';

export const getCourses = async (page = 0, size = 10) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/courses`, {
      params: { page, size },
      headers: { 'Accept': '*/*' }
    });
    return response.data.payload;  // Access the payload directly
  } catch (error) {
    console.error('Error fetching courses', error);
    throw error;
  }
};


export const getCourseById = async (id) => {  
  try {
    const response = await axios.get(`${API_BASE_URL}/courses/details/${id}`, {
      headers: { 'Accept': '*/*' }
    });
    return response.data.payload;
  } catch (error) {
    console.error(`Error fetching course with id ${id}`, error);
    throw error;
  }
};

export const getCourseRatingById = async (id) => {  
  try {
    const response = await axios.get(`${API_BASE_URL}/ratings/course-rating/${id}`, {
      headers: { 'Accept': '*/*' }
    });
    return response.data.payload;
  } catch (error) {
    console.error(`Error fetching course with id ${id}`, error);
    throw error;
  }
};
