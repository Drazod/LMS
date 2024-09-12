import useFetch from "../hooks/useFetch";
import baseAPI from "@/constants/baseAPI";
import axios from "axios";

const Login = async (email, password) => {
  const result = useFetch(
    `https://api.example.com/login?email=${email}&password=${password}`
  );
  return result;
};
const Register = async (email, password) => {
  const result = useFetch(
    `https://api.example.com/register?email=${email}&password=${password}`
  );
  return result;
};
const getListCoursesInCart = async (studentId) => {
  return await axios({
    method: "GET",
    url: `${baseAPI}/api/cart/${studentId}/listCourse`,
  })
};
const getListVouchers = async (studentId) => {
  return await axios({
    method: "GET",
    url: `${baseAPI}/api/discounts/listDiscountFromStudent?studentId=${studentId}`,
  })
};
const deleteCourse = async (studentId, courseId) => {
  return await axios({
    method: "DELETE",
    url: `${baseAPI}/api/cart/deleteCourseFromCart?studentId=${studentId}&courseId=${courseId}`,
  });
}
const deleteAllCourse = async (studentId) => {
  return await axios({
    method: "DELETE",
    url: `${baseAPI}/api/cart/deleteAllCourseFromCart?studentId=${studentId}`,
  });
}
const deleteListCourse = async (studentId, listCourseDelete) => {
  return await axios({
    method: "DELETE",
    url: `${baseAPI}/api/cart/deleteListCourseFromCart?studentId=${studentId}&listCourseDelete=${listCourseDelete}`,
  });
};
const checkoutOrder = async (data) => {
  return await axios({
    method: "POST",
    url: `${baseAPI}/api/orders/checkout`,
    data: data,
  });
}
const processingPurchase = async (data) => {
  return await axios({
    method: "POST",
    url: `${baseAPI}/api/orders/processingPurchase`,
    data: data,
  });
}
const getCartInfo = async (studentId) => {
  return await axios({
    method: "GET",
    url: `${baseAPI}/api/cart/${studentId}/getCartId`,
  });
}
const createCart = async (studentId) => {
  return await axios({
    method: "POST",
    url: `${baseAPI}/api/cart/createCart?studentId=${studentId}`,
  });
}
export { Login, Register, getListCoursesInCart, getListVouchers, deleteCourse, deleteAllCourse, deleteListCourse, checkoutOrder, processingPurchase,getCartInfo, createCart};
