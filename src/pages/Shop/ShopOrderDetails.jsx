import Footer from "../../components/Route/Footer/Footer";
import DashboardHeader from "./layout/DashboardHeader";
import OrderDetails from "../../components/Shop/OrderDetails";

const ShopOrderDetails = () => {
  return (
    <div>
      <DashboardHeader />
      <OrderDetails />
      <Footer />
    </div>
  );
};

export default ShopOrderDetails;
