import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const UsageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const logVisit = async () => {
      try {
        await axios.post("http://localhost:8080/api/usage/log", {
          page: location.pathname,
        });
      } catch (error) {
        console.error("Error logging page visit:", error);
      }
    };

    logVisit();
  }, [location]);

  return null;
};

export default UsageTracker;
