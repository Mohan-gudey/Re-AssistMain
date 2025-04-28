import { getAuthHeaders } from './authUtils';

export const apiClient = async (url, options = {}) => {
  try {
    const headers = {
      ...options.headers,
      ...getAuthHeaders(),
    };

    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Request failed");
    }

    return response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error; // Re-throw for handling in components
  }
};