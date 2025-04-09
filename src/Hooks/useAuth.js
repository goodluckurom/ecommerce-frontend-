import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../redux/actions/user";
import { loadSeller } from "../redux/actions/seller";
// import { refreshToken } from "../api/auth"; // Import the API function to refresh token
import { toast } from "react-toastify";
import { refreshAccessToken } from "../../../server/middleware/auth";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    // Load user on app load
    dispatch(loadUser()).catch((error) => {
      console.error("Error loading user:", error);
    });

    // Load seller on app load
    dispatch(loadSeller()).catch((error) => {
      toast.error(error);
    });
  }, [dispatch]);

  useEffect(() => {
    // Check token expiration and trigger token refresh if needed
    const checkTokenExpiration = async () => {
      if (!isAuthenticated) return;

      const expirationTime = 5 * 60 * 1000; // Refresh token 5 minutes before expiration
      const tokenExpireAt = new Date(
        localStorage.getItem("tokenExpireAt")
      ).getTime();

      if (Date.now() >= tokenExpireAt - expirationTime) {
        try {
          await refreshAccessToken(); // Call the API function to refresh token
          // Reload user and seller data after token refresh
          dispatch(loadUser());
          dispatch(loadSeller());
        } catch (error) {
          console.error("Error refreshing token:", error);
        }
      }
    };

    const interval = setInterval(checkTokenExpiration, 60000); // Check every minute
    return () => clearInterval(interval); // Cleanup on unmount
  }, [isAuthenticated, dispatch]);

  return { isAuthenticated };
};
