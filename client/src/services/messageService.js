import API from "../api/api";
import { defaultMessages } from "../data/defaultData";

const getSavedMessages = () => {
  const saved = localStorage.getItem("portfolio_messages");
  return saved ? JSON.parse(saved) : defaultMessages;
};

const saveMessages = (msgs) => {
  localStorage.setItem("portfolio_messages", JSON.stringify(msgs));
};

const getAllMessages = async () => {
  try {
    const response = await API.get("/messages", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data || getSavedMessages();
  } catch (error) {
    console.warn("Using offline messages:", error.message);
    return getSavedMessages();
  }
};

const getMessage = async (id) => {
  try {
    const response = await API.get(`/messages/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    const msgs = getSavedMessages();
    return msgs.find((m) => m._id === id) || msgs[0];
  }
};

const createMessage = async (data) => {
  try {
    const response = await API.post("/messages", data);
    return response.data;
  } catch (error) {
    const msgs = getSavedMessages();
    const newMsg = {
      _id: "msg-" + Date.now(),
      ...data,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    msgs.unshift(newMsg);
    saveMessages(msgs);
    return newMsg;
  }
};

const updateMessage = async (id, data) => {
  try {
    const response = await API.patch(`/messages/${id}`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    const msgs = getSavedMessages().map((m) =>
      m._id === id ? { ...m, ...data } : m
    );
    saveMessages(msgs);
    return msgs.find((m) => m._id === id);
  }
};

const deleteMessage = async (id) => {
  try {
    const response = await API.delete(`/messages/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    const msgs = getSavedMessages().filter((m) => m._id !== id);
    saveMessages(msgs);
    return { success: true };
  }
};

export {
  getAllMessages,
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage,
};
