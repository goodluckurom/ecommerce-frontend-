import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { MdBorderClear } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllShopOrders } from "../../redux/actions/order";
import { getAllProductsShop } from "../../redux/actions/product";
import ScaleLoader from "react-spinners/ScaleLoader";

const DashboardContent = () => {
  const { seller } = useSelector((state) => state.seller);
  const { orders: SellerOrders } = useSelector((state) => state.orders);
  const { products } = useSelector((state) => state.products);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllShopOrders(seller._id));
    dispatch(getAllProductsShop(seller._id));

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [dispatch, seller, setLoading]);
  const orders = SellerOrders.filter((order) => order.status === "Delivered");

  const row = orders.map((item) => ({
    id: item._id,
    itemsQty: item.cart.reduce((acc, item) => acc + item.quantity, 0),
    total: "US$ " + item.totalPrice,
    status: item.status,
  }));

  return (
    <div className="w-full p-8">
      <h3 className="text-[22px] font-Poppins pb-2">Overview</h3>
      <div className="w-full block 800px:flex items-center justify-between">
        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiOutlineMoneyCollect size={30} className="mr-2" fill="#3321c8" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              Account Balance{" "}
              <span className="text-[16px]">(with 10% service charge)</span>
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            ${seller.availableBalance}
          </h5>
          <Link to="/dashboard-withdraw-money">
            <h5 className="pt-4 pl-[2] text-[#3321c8]">Withdraw Money</h5>
          </Link>
        </div>

        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <MdBorderClear size={30} className="mr-2" fill="#3321c8" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              All Orders
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {orders && orders.length}
          </h5>
          <Link to="/dashboard-orders">
            <h5 className="pt-4 pl-2 text-[#3321c8]">View Orders</h5>
          </Link>
        </div>

        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiOutlineMoneyCollect size={30} className="mr-2" fill="#3321c8" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              All Products
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {products && products.length}
          </h5>
          <Link to="/dashboard-products">
            <h5 className="pt-4 pl-2 text-[#3321c8]">View Products</h5>
          </Link>
        </div>
      </div>
      <br />
      <h3 className="text-[22px] font-Poppins pb-2">Latest Orders</h3>

      <table className="data-table w-full border-collapse mb-5 overflow-hidden rounded-lg">
        <thead className="bg-[#f0f4f8] border-l-4 border-[#3321c8]">
          <tr>
            <th className="py-3 px-4 text-left">Order ID</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-left">Items Qty</th>
            <th className="py-3 px-4 text-left">Total</th>
            <th className="py-3 px-4 text-left"></th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5" className="py-10">
                <div className="flex justify-center items-center">
                  <ScaleLoader color="#3321c8" />
                </div>
              </td>
            </tr>
          ) : (
            row.map((order, index) => (
              <tr
                key={order.id}
                className={`border-l-4 border-[#3321c8] ${
                  index % 2 === 0 ? "bg-[#f9fafb]" : ""
                } hover:bg-[#edf2f7]`}
              >
                <td className="py-3 px-4">{order.id}</td>
                <td className="py-3 px-4">
                  <span className="text-green-500">{order.status}</span>
                </td>
                <td className="py-3 px-4">{order.itemsQty}</td>
                <td className="py-3 px-4">{order.total}</td>
                <td className="py-3 px-4">
                  <Link to={`/dashboard-order/${order.id}`}>
                    <button className="order-details-btn bg-[#3321c8] text-white py-2 px-4 rounded hover:bg-blue-700">
                      <AiOutlineArrowRight size={20} />
                    </button>
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardContent;
