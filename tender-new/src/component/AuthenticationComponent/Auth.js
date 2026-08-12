
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function Auth() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const adminPaths = ["/admin", "/addcategory", "/addsubcategory", "/manageuser", "/cpadmin", "/epadmin"];
    const userPaths = ["/user", "/cpuser", "/epuser", "/viewcategory", "/viewp", "/viewbidp"];

    if (adminPaths.includes(path)) {
      if (!token || role !== "admin") {
        navigate("/logout");
      }
    } else if (userPaths.some(p => path.startsWith(p))) {
      if (!token) {
        navigate("/logout");
      }
    } else if (path === "/login" || path === "/register") {
      if (token) {
        if (role === "admin") {
          navigate("/admin");
        } else {
          navigate("/user");
        }
      }
    }
  }, [location.pathname, navigate]);

  return null;
}

export default Auth;

