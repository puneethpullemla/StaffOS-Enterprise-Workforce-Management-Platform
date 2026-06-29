import api from "../api/axios";

export const getEmployees = async (
  search = "",
  page = 1,
  limit = 10
) => {
  const response = await api.get("/employees", {
    params: {
      search,
      page,
      limit,
    },
  });

  return response;
};

export const getEmployee = async (id: number) => {
  const response = await api.get(`/employees/${id}`);
  return response;
};

export const createEmployee = async (employee: any) => {
  const response = await api.post("/employees", employee);
  return response.data;
};

export const updateEmployee = async (
  id: number,
  employee: any
) => {
  const response = await api.put(
    `/employees/${id}`,
    employee
  );
  return response.data;
};

export const deleteEmployee = async (
  id: number
) => {
  const response = await api.delete(
    `/employees/${id}`
  );
  return response.data;
};