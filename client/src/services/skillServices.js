import API from "../api/api";
import { defaultSkills } from "../data/defaultData";

const getSkills = async () => {
  try {
    const response = await API.get("/skills");
    return response.data?.length ? response.data : defaultSkills;
  } catch (error) {
    console.warn("Using offline/fallback skills data:", error.message);
    return defaultSkills;
  }
};

const getSkill = async (id) => {
  try {
    const response = await API.get(`/skills/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to get skill", {
      cause: error,
    });
  }
};

const createSkill = async (skillData) => {
  try {
    const response = await API.post("/skills", skillData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create skill", {
      cause: error,
    });
  }
};

const updateSkill = async (id, skillData) => {
  try {
    const response = await API.patch(`/skills/${id}`, skillData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update skill", {
      cause: error,
    });
  }
};

const deleteSkill = async (id) => {
  try {
    const response = await API.delete(`/skills/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete skill", {
      cause: error,
    });
  }
};

export { getSkills, getSkill, createSkill, updateSkill, deleteSkill };
