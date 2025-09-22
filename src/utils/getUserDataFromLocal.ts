export const getUserDataFromLocal = () => ({
  userId: Number(localStorage.getItem("userId")),
  userName: localStorage.getItem("name"),
  role: localStorage.getItem("role"),
  avatar: localStorage.getItem("avtUrl"),
});
