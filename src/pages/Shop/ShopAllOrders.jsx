import DashboardHeader from "./layout/DashboardHeader";
import DashboardSideBar from "./layout/DashboardSideBar";
import AllShopOrders from "../../components/Shop/AllShopOrders";

const ShopAllOrders = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80%] 800px:w-[330px]">
          <DashboardSideBar active={2} />
        </div>
        <div className="w-full flex justify-center ">
          <AllShopOrders />
        </div>
      </div>
    </div>
  );
};

export default ShopAllOrders;
