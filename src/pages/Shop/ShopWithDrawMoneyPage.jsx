import DashboardHeader from "./layout/DashboardHeader";
import DashboardSideBar from "./layout/DashboardSideBar";
import WithdrawMoney from "../../components/Shop/WithdrawMoney";

const ShopWithDrawMoneyPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[300px]">
          <DashboardSideBar active={7} />
        </div>
        <WithdrawMoney />
      </div>
    </div>
  );
};

export default ShopWithDrawMoneyPage;
