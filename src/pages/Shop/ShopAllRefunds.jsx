import DashboardHeader from "./layout/DashboardHeader";
import DashboardSideBar from "./layout/DashboardSideBar";
import AllShopRefundOrder from "../../components/Shop/AllShopRefundOrder";

const ShopAllRefunds = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className=" w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={10} />
        </div>
        <div className="w-full justify-center flex">
          <AllShopRefundOrder />
        </div>
      </div>
    </div>
  );
};

export default ShopAllRefunds;
