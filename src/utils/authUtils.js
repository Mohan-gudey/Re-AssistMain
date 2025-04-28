export const getAuthHeaders = () => {
    try {
      const token = localStorage.getItem("authToken"); // Retrieve the token from localStorage
  
      if (!token) {
        console.error("No token found in localStorage.");
        return null; // Return null if no token is found
      }
  
      const decodedToken = parseJwt(token); // Decode the JWT
  
      if (!decodedToken || !decodedToken.userId) {
        console.error("Invalid or expired token.");
        return null; // Return null if the token is invalid or missing userId
      }
  
      // Construct and return the headers
      return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
    } catch (error) {
      console.error("Error generating auth headers:", error);
      return null; // Return null in case of any unexpected errors
    }
  };
  
  function parseJwt(token) {
    try {
      if (!token) {
        console.error("Token is null or undefined.");
        return null;
      }
  
      const base64Url = token.split(".")[1]; // Extract the payload part of the JWT
      if (!base64Url) {
        console.error("Invalid token format.");
        return null;
      }
  
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Replace URL-safe characters
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => `%${c.charCodeAt(0).toString(16).padStart(2, "0")}`)
          .join("")
      );
  
      return JSON.parse(jsonPayload); // Parse the decoded payload
    } catch (error) {
      console.error("Error decoding JWT:", error);
      return null; // Return null if decoding fails
    }
  }