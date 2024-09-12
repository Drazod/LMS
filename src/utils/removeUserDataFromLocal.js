export const removeUserDataFromLocal = () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("name");
  localStorage.removeItem("role");
  localStorage.removeItem("avtUrl");
};
