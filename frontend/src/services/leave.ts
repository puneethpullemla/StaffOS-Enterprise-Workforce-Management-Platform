import api from "../api/axios";

export const getLeaves = async () => {
  const response = await api.get("/leaves");
  return response;
};

export const applyLeave = async (data: any) => {
  const response = await api.post("/leaves", data);
  return response.data;
};

export const updateLeave = async (
  id: number,
  status: string
) => {
  const response = await api.put(
    `/leaves/${id}`,
    {
      status,
    }
  );

  return response.data;
};