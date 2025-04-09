/* eslint-disable react/prop-types */
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./AllShopOrders.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ScaleLoader from "react-spinners/ScaleLoader";
import { getAllShopOrders } from "../../redux/actions/order";

const AllOrders = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [allShopOrders, setAllShopOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageSize] = useState(10);
  const { seller } = useSelector((state) => state.seller);
  const { orders } = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  const columns = [
    { Header: "S/N", accessor: "s/n", id: "s/n" },
    { Header: "Order ID", accessor: "id", id: "orderId" },
    { Header: "Status", accessor: "status", id: "orderStatus" },
    { Header: "Items Qty", accessor: "itemsQty", id: "itemsQty" },
    { Header: "Total", accessor: "total", id: "totalAmount" },
    {
      Header: "",
      accessor: "id",
      Cell: ({ row }) => (
        <Link to={`/order/${row.original.id}`}>
          <button className="order-details-btn">
            <AiOutlineArrowRight size={20} title="Veiw order details" />
          </button>
        </Link>
      ),
    },
  ];

  const startIndex = pageIndex * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = allShopOrders.slice(startIndex, endIndex);

  // Fetch shop orders
  useEffect(() => {
    if (seller && seller._id) {
      setIsLoading(true);
      dispatch(getAllShopOrders(seller._id));
    }
  }, [seller, dispatch]);

  useEffect(() => {
    if (orders && orders.length > 0) {
      setAllShopOrders([...orders]);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [orders]);

  return (
    <div className="all-orders w-full pt-1 mt-10">
      <table className="data-table divide-gray-200 divide-y">
        <thead>
          <tr className="table-header">
            {columns.map((column) => (
              <th key={column.id}>{column.Header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="table-body">
          {isLoading ? (
            <tr className="loading-row">
              <td colSpan={columns.length}>
                <div className="loading-container flex flex-col">
                  <ScaleLoader color="#3321c8" />
                  <h2 className="text-2xl text-blue-700 ">
                    fetching your orders...
                  </h2>
                </div>
              </td>
            </tr>
          ) : (
            paginatedData.map((order, index) => (
              <tr key={order._id}>
                <td className="table-cell">{index + 1}</td>
                <td className="table-cell">{order._id}</td>
                <td
                  className={`table-cell order-status ${
                    order.status ? order.status.toLowerCase() : ""
                  }`}
                >
                  {order.status}
                </td>
                <td className="table-cell">{order.cart.length}</td>
                <td className="table-cell">US${order.totalPrice}</td>
                <td className="table-cell">
                  <Link to={`/dashboard-order/${order._id}`}>
                    <button className="order-details-btn">
                      <AiOutlineArrowRight size={20} title="Go to orders" />
                    </button>
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() =>
            setPageIndex((prevIndex) => Math.max(prevIndex - 1, 0))
          }
          disabled={pageIndex === 0}
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
                Math.ceil(allShopOrders.length / pageSize) - 1
              )
            )
          }
          disabled={
            pageIndex === Math.ceil(allShopOrders.length / pageSize) - 1
          }
          className={`pagination-btn ${
            pageIndex === Math.ceil(allShopOrders.length / pageSize) - 1 &&
            "pagination-btn-disabled"
          }`}
        >
          Next
        </button>{" "}
        Page
        <strong>
          {pageIndex + 1} of {Math.ceil(allShopOrders.length / pageSize)}
        </strong>{" "}
      </div>
    </div>
  );
};

export default AllOrders;
