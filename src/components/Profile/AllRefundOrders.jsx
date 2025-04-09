/* eslint-disable react/prop-types */
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./AllRefundOrders.scss"; // Assuming you have a separate SCSS file for refund orders
import { useState } from "react";

const AllRefundOrders = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize] = useState(10);

  const generateRandomRefundOrders = () => {
    // Function to generate random refund orders
    const orders = [];
    const statuses = ["Processing", "Completed", "Failed"];

    for (let i = 0; i < 14; i++) {
      const randomOrderId = Math.random().toString(36).substr(2, 9);
      const randomItemCount = Math.floor(Math.random() * 5) + 1;
      const randomTotalPrice = Math.floor(Math.random() * 1000) + 500;
      const randomStatus =
        statuses[Math.floor(Math.random() * statuses.length)];

      const orderItems = [];
      for (let j = 0; j < randomItemCount; j++) {
        const itemName = `Item ${j + 1}`;
        orderItems.push({ name: itemName });
      }

      orders.push({
        _id: randomOrderId,
        orderItems: orderItems,
        totalPrice: randomTotalPrice,
        orderStatus: randomStatus,
      });
    }

    return orders;
  };

  const orders = generateRandomRefundOrders();

  const columns = [
    { Header: "Order ID", accessor: "id", id: "orderId" },
    { Header: "Status", accessor: "status", id: "orderStatus" },
    { Header: "Items Qty", accessor: "itemsQty", id: "itemsQty" },
    { Header: "Total", accessor: "total", id: "totalAmount" },
    {
      Header: "",
      accessor: "id",
      Cell: ({ row }) => (
        <Link to={`/user/order/${row.original.id}`}>
          <button className="order-details-btn">
            <AiOutlineArrowRight size={20} />
          </button>
        </Link>
      ),
    },
  ];

  const startIndex = pageIndex * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = orders.slice(startIndex, endIndex);

  return (
    <div className="all-refund-orders">
      <table className="data-table">
        <thead>
          <tr className="table-header">
            {columns.map((column) => (
              <th key={column.id}>{column.Header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="table-body">
          {paginatedData.map((order) => (
            <tr key={order._id}>
              <td className="table-cell">{order._id}</td>
              <td
                className={`table-cell order-status ${order.orderStatus.toLowerCase()}`}
              >
                {order.orderStatus}
              </td>
              <td className="table-cell">{order.orderItems.length}</td>
              <td className="table-cell">US${order.totalPrice}</td>
              <td className="table-cell">
                <Link to={`/user/order/${order._id}`}>
                  <button className="order-details-btn">
                    <AiOutlineArrowRight size={20} title="Go to orders" />
                  </button>
                </Link>
              </td>
            </tr>
          ))}
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
              Math.min(prevIndex + 1, Math.ceil(orders.length / pageSize) - 1)
            )
          }
          disabled={pageIndex === Math.ceil(orders.length / pageSize) - 1}
          className={`pagination-btn ${
            pageIndex === Math.ceil(orders.length / pageSize) - 1 &&
            "pagination-btn-disabled"
          }`}
        >
          Next
        </button>{" "}
        Page{" "}
        <strong>
          {pageIndex + 1} of {Math.ceil(orders.length / pageSize)}
        </strong>{" "}
      </div>
    </div>
  );
};

export default AllRefundOrders;
