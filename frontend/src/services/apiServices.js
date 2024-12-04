import axiosInstance from "../axiosConfig/axiosInstance";

//(Sign Up)
export const signUp = async (username, email, password) => {
  const response = await axiosInstance.post("/api/auth/sign-up", {
    name: username,
    email,
    password,
  });
  return response.data;
};

//(Sign In)
export const signIn = async (email, password) => {
  const response = await axiosInstance.post("/api/auth/sign-in", {
    email,
    password,
  });
  return response.data;
};

//admin
export const testAdminAuth = async () => {
  const response = await axiosInstance.get("/api/test/admin");
  return response.data;
};

//User
export const testUserAuth = async () => {
  const response = await axiosInstance.get("/api/test/user");
  return response.data;
};

// Recent Transactions
export const getRecentTransactions = async () => {
  const response = await axiosInstance.get("/api/transactions/recent");
  return response.data;
};

export const getCards = async () => {
  const response = await axiosInstance.get("/api/cards");
  return response.data;
};

//Payment
export const makePayment = async (paymentData) => {
  const response = await axiosInstance.post("/api/payments", paymentData);
  return response.data;
};

//Transaction History
export const getTransactionHistory = async (filters) => {
  const response = await axiosInstance.get("/api/transactions/history", {
    params: filters,
  });
  return response.data;

  
};
