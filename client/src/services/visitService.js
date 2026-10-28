import API from "../api/api";
import { defaultVisits, defaultTimeline } from "../data/defaultData";

const getVisits = async () => {
  try {
    const response = await API.get("/visits", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data || defaultVisits;
  } catch (error) {
    console.warn("Using offline visits data:", error.message);
    return defaultVisits;
  }
};

const addVisit = async () => {
  try {
    const response = await API.post("/visits");
    return response.data;
  } catch (error) {
    return { success: true };
  }
};

const getVisitsTimeline = async (days = 30) => {
  try {
    const response = await API.get("/visits/timeline", {
      params: { days },
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data?.length ? response.data : defaultTimeline;
  } catch (error) {
    console.warn("Using offline visits timeline:", error.message);
    return defaultTimeline;
  }
};

export { getVisits, addVisit, getVisitsTimeline };
