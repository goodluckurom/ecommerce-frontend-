import DashboardHeader from "./layout/DashboardHeader";
import DashboardSideBar from "./layout/DashboardSideBar";
import DashboardMessages from "../../components/Shop/DashboardMessages";

const ShopInboxPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[300px]">
          <DashboardSideBar active={8} />
        </div>
        <DashboardMessages />
      </div>
    </div>
  );
};

export default ShopInboxPage;
