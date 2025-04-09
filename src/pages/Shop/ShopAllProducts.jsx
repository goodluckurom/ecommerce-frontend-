import DashboardHeader from "./layout/DashboardHeader";
import DashboardSideBar from "./layout/DashboardSideBar";
import AllProducts from "../../components/Shop/AllProducts";

const ShopAllProducts = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80%] 800px:w-[330px]">
          <DashboardSideBar active={3} />
        </div>
        <div className="w-full flex justify-center ">
          <AllProducts />
        </div>
      </div>
    </div>
  );
};

export default ShopAllProducts;
