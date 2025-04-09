import DashboardHeader from "../../pages/Shop/layout/DashboardHeader";
import DashboardSideBar from "../../pages/Shop/layout/DashboardSideBar";
import DashboardContent from "../../components/Shop/DashboardContent";
const ShopDashboardPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-betwee w-fulln">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={1} />
        </div>
        <DashboardContent />
      </div>
    </div>
  );
};

export default ShopDashboardPage;
