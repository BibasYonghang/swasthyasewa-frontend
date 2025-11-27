import axios from "axios";

// Do NOT use dotenv in the frontend! Instead, use import.meta.env (Vite) or process.env (Webpack/CRA)
const API_BASE = import.meta.env.VITE_API_BASE;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchPosts = async (page, limit = 5) => {
  const res = await axios.get(`${API_BASE}/posts?page=${page}&limit=${limit}`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

export const sendReaction = async (postId, reaction) => {
  const res = await axios.post(
    `${API_BASE}/posts/${postId}/react`,
    { reaction },
    { headers: getAuthHeaders() }
  );
  return res.data;
};

export const shareToTimeline = async (postId, comment) => {
  const res = await axios.post(
    `${API_BASE}/posts/${postId}/share`,
    { comment },
    { headers: getAuthHeaders() }
  );
  return res.data;
};

export const shareInMessenger = async (postId, toUser, comment) => {
  const res = await axios.post(
    `${API_BASE}/posts/${postId}/share-messenger`,
    { toUser, comment },
    { headers: getAuthHeaders() }
  );
  return res.data;
};
