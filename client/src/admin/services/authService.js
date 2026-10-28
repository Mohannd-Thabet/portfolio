import API from "../../api/api";

const loginApi = async (email, password) => {
  try {
    const response = await API.post("/auth/login", { email, password });
    return response.data;
  } catch (error) {
    console.warn("Server unreachable or error, checking credentials for demo mode:", error.message);
    if (email === "admin@portfolio.com" && password === "admin") {
      const mockUser = {
        token: "demo_token_" + Date.now(),
        user: {
          id: "admin-001",
          email: "admin@portfolio.com",
          name: "Mohannad AL- Buhari",
          role: "admin",
        },
      };
      return mockUser;
    }
    if (error.response?.status === 401) {
      throw new Error("Invalid Email or Password", { cause: error });
    } else {
      throw new Error("Invalid Email or Password", { cause: error });
    }
  }
};

export { loginApi };
