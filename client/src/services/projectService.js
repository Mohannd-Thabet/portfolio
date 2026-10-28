import API from "../api/api";
import { defaultProjects } from "../data/defaultData";

const getSavedProjects = () => {
  try {
    const saved = localStorage.getItem("portfolio_projects");
    return saved ? JSON.parse(saved) : defaultProjects;
  } catch {
    return defaultProjects;
  }
};

const saveProjects = (projects) => {
  try {
    localStorage.setItem("portfolio_projects", JSON.stringify(projects));
  } catch {}
};

const getProjects = async () => {
  try {
    const response = await API.get("/projects");
    return response.data?.length ? response.data : getSavedProjects();
  } catch (error) {
    console.warn("Using offline/fallback projects data:", error.message);
    return getSavedProjects();
  }
};

const createProject = async (projectData) => {
  try {
    const response = await API.post("/projects", projectData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    const projects = getSavedProjects();
    const newProj = {
      _id: "proj-" + Date.now(),
      title: projectData.get ? projectData.get("title") : projectData.title,
      description: projectData.get ? projectData.get("description") : projectData.description,
      tags: projectData.get ? (projectData.get("tags") || "").split(",").map((t) => t.trim()) : (projectData.tags || []),
      image: { url: "/projects/mazaya.png" },
      liveUrl: projectData.get ? projectData.get("liveUrl") : projectData.liveUrl,
      githubUrl: projectData.get ? projectData.get("githubUrl") : projectData.githubUrl,
      featured: true,
      order: projects.length + 1,
    };
    projects.push(newProj);
    saveProjects(projects);
    return newProj;
  }
};

const deleteProject = async (id) => {
  try {
    const response = await API.delete(`/projects/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    const projects = getSavedProjects().filter((p) => p._id !== id);
    saveProjects(projects);
    return { success: true };
  }
};

const updateProject = async (id, projectData) => {
  try {
    const response = await API.patch(`/projects/${id}`, projectData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    const projects = getSavedProjects().map((p) => {
      if (p._id === id) {
        return {
          ...p,
          title: projectData.get ? projectData.get("title") || p.title : projectData.title || p.title,
          description: projectData.get ? projectData.get("description") || p.description : projectData.description || p.description,
          liveUrl: projectData.get ? projectData.get("liveUrl") || p.liveUrl : projectData.liveUrl || p.liveUrl,
          githubUrl: projectData.get ? projectData.get("githubUrl") || p.githubUrl : projectData.githubUrl || p.githubUrl,
        };
      }
      return p;
    });
    saveProjects(projects);
    return projects.find((p) => p._id === id);
  }
};

const getProject = async (id) => {
  try {
    const response = await API.get(`/projects/${id}`);
    return response.data;
  } catch (error) {
    const projects = getSavedProjects();
    return projects.find((p) => p._id === id) || projects[0];
  }
};

export { getProjects, createProject, deleteProject, updateProject, getProject };
