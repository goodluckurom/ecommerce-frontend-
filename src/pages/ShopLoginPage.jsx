import { useEffect } from "react";
import ShopLogin from "../components/Shop/ShopLogin";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ShopLoginPage = () => {
  const { isSeller } = useSelector((state) => state.seller);
  const navigate = useNavigate();
  useEffect(() => {
    if (isSeller === true) {
      navigate(`/dashboard`);
    }
  }, [isSeller, navigate]);
  return (
    <div>
      <ShopLogin />
    </div>
  );
};

export default ShopLoginPage;
