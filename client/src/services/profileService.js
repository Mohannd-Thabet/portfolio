import API from "../api/api";
import { defaultProfile } from "../data/defaultData";

const getSavedProfile = () => {
  try {
    const saved = localStorage.getItem("portfolio_profile");
    return saved ? JSON.parse(saved) : defaultProfile;
  } catch {
    return defaultProfile;
  }
};

const getProfile = async () => {
  try {
    const response = await API.get("/profile");
    return response.data || getSavedProfile();
  } catch (error) {
    console.warn("Using offline/fallback profile data:", error.message);
    return getSavedProfile();
  }
};

const updateProfile = async (formData) => {
  try {
    const response = await API.patch("/profile", formData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    console.warn("Updating profile in local storage:", error.message);
    const current = getSavedProfile();
    const updated = { ...current };

    if (formData instanceof FormData) {
      for (const [key, value] of formData.entries()) {
        if (typeof value === "string") {
          updated[key] = value;
        }
      }
    } else if (typeof formData === "object") {
      Object.assign(updated, formData);
    }

    localStorage.setItem("portfolio_profile", JSON.stringify(updated));
    return updated;
  }
};

export { getProfile, updateProfile };
