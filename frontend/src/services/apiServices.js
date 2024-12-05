import axiosInstance from "../axiosConfig/axiosInstance";

export const signUp = async (username, email, password) => {
  const response = await axiosInstance.post("/api/auth/sign-up", {
    name: username,
    email,
    password,
  });
  return response.data;
};

export const signIn = async (email, password) => {
  const response = await axiosInstance.post("/api/auth/sign-in", {
    email,
    password,
  });
  return response.data;
};

export const getAdminDashboardData = async () => {
  return await axios.get(`${BASE_URL}/admin-dashboard`);
};

export const getUserDashboardData = async () => {
  return await axios.get(`${BASE_URL}/user-dashboard`);
};

export const testAdminAuth = async () => {
  const response = await axiosInstance.get("/api/test/admin");
  return response.data;
};

export const testUserAuth = async () => {
  const response = await axiosInstance.get("/api/test/user");
  return response.data;
};

export const getRecentTransactions = async () => {
  const response = await axiosInstance.get("/api/transactions/recent");
  return response.data;
};

export const getTransactionSummary = (userId) => {
  return axiosInstance.get(`/api/transactions/summary?userId=${userId}`);
};

export const getCards = async () => {
  const response = await axiosInstance.get("/api/cards");
  return response.data;
};

export const makePayment = async (paymentData) => {
  const response = await axiosInstance.post("/api/payments", paymentData);
  return response.data;
};

export const getTransactionHistory = async (filters) => {
  const response = await axiosInstance.get("/api/transactions/history", {
    params: filters,
  });
  return response.data;

  
};
