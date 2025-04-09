import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../components/Login/Login.jsx";
import { useSelector } from "react-redux";

const LoginPage = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [navigate, isAuthenticated]);

  return (
    <div>
      <Login />
    </div>
  );
};

export default LoginPage;
