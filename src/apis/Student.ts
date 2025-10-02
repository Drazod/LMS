// apis/Student.ts
import { api } from "@/lib/api";

/** ---------- Auth (adjust if your paths differ) ---------- */
export const Login = (email: string, password: string) =>
  api.post("/auth/login", { email, password });

export const Register = (email: string, password: string) =>
  api.post("/auth/register", { email, password });

/** ---------- Cart / Orders ---------- */
// baseURL should be something like: https://lmsbe-production-c3da.up.railway.app/api
// so DON'T prefix paths below with /api again

export const getListCoursesInCart = (studentId: string | number) =>
  api.get(`/cart/${studentId}/listCourse`);

export const getListVouchers = (studentId: string | number) =>
  api.get(`/discounts/listDiscountFromStudent`, { params: { studentId } });

export const deleteCourse = (studentId: string | number, courseId: string | number) =>
  api.delete(`/cart/deleteCourseFromCart`, { params: { studentId, courseId } });

export const deleteAllCourse = (studentId: string | number) =>
  api.delete(`/cart/deleteAllCourseFromCart`, { params: { studentId } });

export const deleteListCourse = (
  studentId: string | number,
  listCourseDelete: Array<string | number>
) =>
  api.delete(`/cart/deleteListCourseFromCart`, {
    params: { studentId, listCourseDelete: listCourseDelete.join(",") },
  });

export const checkoutOrder = (data: {
  idCart: number | string | null;
  idCourses: Array<number | string>;
  idDiscount: number | string | null;
}) => api.post(`/orders/checkout`, data);

export const processingPurchase = (data: {
  prices: { totalPrice: number; discountPrice: number; finalPrice: number };
  idUser: string | number;
  checkoutReq: {
    idCart: number | string | null;
    idCourses: Array<number | string>;
    idDiscount: number | string | null;
  };
}) => api.post(`/orders/processingPurchase`, data);

export const getCartInfo = (studentId: string | number) =>
  api.get(`/cart/${studentId}/getCartId`);

export const createCart = (studentId: string | number) =>
  api.post(`/cart/createCart`, null, { params: { studentId } });
