import api from "../api/axios";

export const getAttendance = async () => {
  const response = await api.get("/attendance");
  return response;
};

export const checkIn = async (employee_id: number) => {
  const response = await api.post(
    "/attendance/check-in",
    {
      employee_id,
    }
  );

  return response.data;
};

export const checkOut = async (employee_id: number) => {
  const response = await api.post(
    "/attendance/check-out",
    {
      employee_id,
    }
  );

  return response.data;
};