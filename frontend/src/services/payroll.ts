import api from "../api/axios";

export const getPayrolls = async () => {
  const response = await api.get("/payroll");
  return response;
};

export const generatePayroll = async (data: any) => {
  const response = await api.post("/payroll", data);
  return response.data;
};

export const markPaid = async (
  id: number,
  status: string
) => {
  const response = await api.put(
    `/payroll/${id}`,
    {
      status,
    }
  );

  return response.data;
};