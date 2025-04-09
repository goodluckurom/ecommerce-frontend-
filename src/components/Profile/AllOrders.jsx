import { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../../redux/actions/order";
import ScaleLoader from "react-spinners/ScaleLoader";
import "./AllOrders.scss";
import { MdOutlineTrackChanges } from "react-icons/md";

const AllOrders = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [allUserOrders, setAllUserOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const pageSize = 10;
  const { user, ordersLoading, orders } = useSelector((state) => ({
    user: state.user.user,
    ordersLoading: state.orders.loading,
    orders: state.orders.orders,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getUserOrders(user._id));
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (!ordersLoading && orders && orders.length > 0) {
      setAllUserOrders(orders);
    }
  }, [ordersLoading, orders]);

  const renderOrders = () => {
    if (isLoading) {
      return (
        <tr className="loading-row">
          <td colSpan="5">
            <div className="loading-container">
              <ScaleLoader color="#3321c8" />
            </div>
          </td>
        </tr>
      );
    } else if (allUserOrders.length === 0) {
      return (
        <div className=" w-full flex items-center justify-center">
          <h2> You have not placed an order</h2>
        </div>
      );
    } else {
      return allUserOrders
        .slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
        .map((order, index) => (
          <tr key={order._id}>
            <td className="table-cell">{index + 1}</td>
            <td className="table-cell">{order._id}</td>
            <td
              className={`table-cell order-status ${order.status.toLowerCase()}`}
            >
              {order.status}
            </td>
            <td className="table-cell">{order.cart.length}</td>
            <td className="table-cell">US${order.totalPrice}</td>
            <td className="table-cell">
              <Link to={`/user/order/${order._id}`}>
                <button className="order-details-btn">
                  <AiOutlineArrowRight size={30} title="Go to orders" />
                </button>
              </Link>{" "}
              <Link to={`/user/track/order/${order._id}`}>
                <button className="order-details-btn">
                  <MdOutlineTrackChanges size={30} title="Track your order" />
                </button>
              </Link>
            </td>
          </tr>
        ));
    }
  };

  return (
    <div className="all-orders">
      <table className="data-table">
        <thead>
          <tr className="table-header">
            <th>S/N</th>
            <th>Order ID</th>
            <th>Status</th>
            <th>Items Qty</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="table-body">{renderOrders()}</tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() =>
            setPageIndex((prevIndex) => Math.max(prevIndex - 1, 0))
          }
          disabled={pageIndex === 0 || isLoading}
          className={`pagination-btn ${
            pageIndex === 0 && "pagination-btn-disabled"
          }`}
        >
          Previous
        </button>{" "}
        <button
          onClick={() =>
            setPageIndex((prevIndex) =>
              Math.min(
                prevIndex + 1,
                Math.ceil(allUserOrders.length / pageSize) - 1
              )
            )
          }
          disabled={
            pageIndex === Math.ceil(allUserOrders.length / pageSize) - 1 ||
            isLoading
          }
          className={`pagination-btn ${
            pageIndex === Math.ceil(allUserOrders.length / pageSize) - 1 &&
            "pagination-btn-disabled"
          }`}
        >
          Next
        </button>{" "}
        Page{" "}
        <strong>
          {pageIndex + 1} of {Math.ceil(allUserOrders.length / pageSize)}
        </strong>{" "}
      </div>
    </div>
  );
};

export default AllOrders;
