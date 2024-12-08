import axiosInstance from "../axiosConfig/axiosInstance";

export const signUp = async (name, email, password) => {
  const response = await axiosInstance.post("/api/auth/sign-up", {
    name,
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

export const testAdminAuth = async () => {
  const response = await axiosInstance.get("/api/test/admin");
  return response.data;
};

export const testUserAuth = async () => {
  const response = await axiosInstance.get("/api/test/user");
  return response.data;
};

export const createAccount = async (userId, accountType, pin, email, password) => {
  const response = await axiosInstance.post(`/api/users/${userId}/accounts`, {
    type: accountType,
    pin,
    email,
    password
  });
  return response.data;
};

export const getTransactionHistory = async (userId, page = 0, size = 5) => {
  const response = await axiosInstance.get(`/api/users/${userId}/transactions`, {
    params: { page, size },
  });
  return response.data;
};

export const getTransactionSummary = async (userId) => {
  const response = await axiosInstance.get(`/api/transactions/summary?userId=${userId}`);
  return response.data;
};

export const getCards = async () => {
  const response = await axiosInstance.get("/api/cards");
  return response.data;
};

export const makePayment = async (paymentData) => {
  const response = await axiosInstance.post("/api/transactions", {
    fromAccountId: paymentData.fromAccountId,
    toAccountId: paymentData.toAccountId,
    amount: paymentData.amount,
    pin: paymentData.pin,
    type: paymentData.type,
  });
  return response.data;
};
