import API from "../api/api";
import { defaultProfile } from "../data/defaultData";

const getProfile = async () => {
  try {
    const response = await API.get("/profile");
    return response.data || defaultProfile;
  } catch (error) {
    console.warn("Using offline/fallback profile data:", error.message);
    return defaultProfile;
  }
};

const updateProfile = async (formData) => {
  try {
    const response = await API.patch("/profile", formData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update profile",
      {
        cause: error,
      },
    );
  }
};

export { getProfile, updateProfile };
