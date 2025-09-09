import API from '@/apis/instance.js'
import baseAPI from '@/constants/baseAPI.js'

const getCourse = (page) => {
  return API.get(`${baseAPI}/api/courses?page=${page}&size=9`)
}

const getCategory = () => {
  return API.get(`${baseAPI}/api/categories`)
}

const getInstructor = () => {
  return API.get(`${baseAPI}/api/instructors`)
}

const searchCourse = (page, instructorId, categoryId, title, minPrice, maxPrice, sort, direction) => {
  return API.get(`${baseAPI}/api/courses/search?page=${page}&size=9${instructorId ? '&instructorId=' + instructorId : ''}${categoryId ? '&categoryId=' + categoryId : ''}${title ? '&title=' + title : ''}${minPrice ? '&minPrice=' + minPrice : ''}${maxPrice ? '&maxPrice=' + maxPrice : ''}${sort ? '&sort=' + sort :''}${direction ? '&direction=' + direction : ''}`)
}



// API.interceptors.request.use(req => {
//   console.log("🚀 ~ req:", req)
//   return req
// }, err => {
//   return Promise.reject(err)
// })

// API.interceptors.response.use(res => {
//   console.log("🚀 ~ res:", res)
//   return res
// }, err => {
//   return Promise.reject(err)
// })

export {
  getCourse,
  getCategory,
  getInstructor,
  searchCourse
}