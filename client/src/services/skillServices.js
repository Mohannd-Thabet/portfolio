import API from "../api/api";
import { defaultSkills } from "../data/defaultData";

const getSavedSkills = () => {
  try {
    const saved = localStorage.getItem("portfolio_skills");
    return saved ? JSON.parse(saved) : defaultSkills;
  } catch {
    return defaultSkills;
  }
};

const saveSkills = (skills) => {
  try {
    localStorage.setItem("portfolio_skills", JSON.stringify(skills));
  } catch {}
};

const getSkills = async () => {
  try {
    const response = await API.get("/skills");
    return response.data?.length ? response.data : getSavedSkills();
  } catch (error) {
    console.warn("Using offline/fallback skills data:", error.message);
    return getSavedSkills();
  }
};

const getSkill = async (id) => {
  try {
    const response = await API.get(`/skills/${id}`);
    return response.data;
  } catch (error) {
    const skills = getSavedSkills();
    return skills.find((s) => s._id === id) || skills[0];
  }
};

const createSkill = async (skillData) => {
  try {
    const response = await API.post("/skills", skillData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    const skills = getSavedSkills();
    const newSkill = {
      _id: "skill-" + Date.now(),
      name: skillData.get ? skillData.get("name") : skillData.name,
      type: skillData.get ? skillData.get("type") : skillData.type,
      icon: "/ai-icon.svg",
      order: skills.length + 1,
    };
    skills.push(newSkill);
    saveSkills(skills);
    return newSkill;
  }
};

const deleteSkill = async (id) => {
  try {
    const response = await API.delete(`/skills/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    const skills = getSavedSkills().filter((s) => s._id !== id);
    saveSkills(skills);
    return { success: true };
  }
};

const updateSkill = async (id, skillData) => {
  try {
    const response = await API.patch(`/skills/${id}`, skillData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    const skills = getSavedSkills().map((s) => {
      if (s._id === id) {
        return {
          ...s,
          name: skillData.get ? skillData.get("name") || s.name : skillData.name || s.name,
          type: skillData.get ? skillData.get("type") || s.type : skillData.type || s.type,
        };
      }
      return s;
    });
    saveSkills(skills);
    return skills.find((s) => s._id === id);
  }
};

export { getSkills, getSkill, createSkill, deleteSkill, updateSkill };
