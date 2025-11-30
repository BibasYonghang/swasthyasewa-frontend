import axios from "axios";
const API_BASE = import.meta.env.VITE_API_BASE;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * Fetch posts with pagination
 * @param {number} page - Page number
 * @param {number} limit - Number of posts per page
 * @returns {object} - { posts: [], hasMore: boolean }
 */
export const fetchPosts = async (page, limit = 5) => {
  try {
    const res = await axios.get(
      `${API_BASE}/posts?page=${page}&limit=${limit}`,
      {
        headers: getAuthHeaders(),
      }
    );
    return res.data;
  } catch (err) {
    console.error("Error fetching posts:", err.response?.data || err.message);
    return { posts: [], hasMore: false };
  }
};

/**
 * Send reaction to a post
 * @param {string} postId
 * @param {string} reaction
 * @returns {object} - Updated post data
 */
// posts.js (frontend)
export const sendReaction = async (postId, reaction) => {
  try {
    const res = await axios.post(
      `${API_BASE}/posts/${postId}/react`,
      { reaction }, // only reaction needed
      { headers: getAuthHeaders() }
    );
    return res.data;
  } catch (err) {
    console.error("Error sending reaction:", err.response?.data || err.message);
    throw err;
  }
};

/**
 * Share a post to timeline
 * @param {string} postId
 * @param {string} comment
 * @returns {object} - Shared post data
 */
export const shareToTimeline = async (postId, comment) => {
  try {
    const res = await axios.post(
      `${API_BASE}/posts/${postId}/share`,
      { comment },
      { headers: getAuthHeaders() }
    );
    return res.data;
  } catch (err) {
    console.error(
      "Error sharing post to timeline:",
      err.response?.data || err.message
    );
    throw err;
  }
};

/**
 * Share a post in messenger
 * @param {string} postId
 * @param {string} toUser
 * @param {string} comment
 * @returns {object} - Shared post data
 */
export const shareInMessenger = async (postId, toUser, comment) => {
  try {
    const res = await axios.post(
      `${API_BASE}/posts/${postId}/share-messenger`,
      { toUser, comment },
      { headers: getAuthHeaders() }
    );
    return res.data;
  } catch (err) {
    console.error(
      "Error sharing post in messenger:",
      err.response?.data || err.message
    );
    throw err;
  }
};

/**
 * Create a new post
 * @param {FormData} formData
 * @param {string} token - Optional token if needed
 * @returns {object} - Newly created post
 */
export const createNewPost = async (formData, token) => {
  try {
    const res = await fetch(`${API_BASE}/posts`, {
      method: "POST",
      body: formData, // Let the browser set Content-Type automatically for FormData
      headers: token ? { Authorization: `Bearer ${token}` } : getAuthHeaders(),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to create post");
    }

    return res.json();
  } catch (err) {
    console.error("Error creating new post:", err.message);
    throw err;
  }
};
