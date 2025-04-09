import { useEffect, useState } from "react";
import axios from "axios";
import { imageUrl, server } from "../../server";
import { useParams, Link, useNavigate } from "react-router-dom";
import { BsFillBagFill } from "react-icons/bs";
import styles from "../../styles/styles";
import ScaleLoader from "react-spinners/ScaleLoader";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getAllShopOrders } from "../../redux/actions/order";

const OrderDetails = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [status, setStatus] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);

  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await axios.get(
        `${server}/order/get-order-details/${orderId}`,
        {
          withCredentials: true,
        }
      );
      return response;
    } catch (err) {
      toast.error(err.response.data.message || "Error fetching order details.");
    }
  };

  useEffect(() => {
    const getOrderDetails = async () => {
      const data = await fetchOrderDetails(id);
      if (data && data.data) {
        setOrderDetails(data.data.order);
        setStatus(data.data.order.status);
      }
    };
    getOrderDetails();
  }, [id]);

  const orderUpdateHandler = async () => {
    try {
      const { data } = await axios.put(
        `${server}/order/update-order-status/${id}`,
        { status },
        { withCredentials: true }
      );
      toast.success(data.message);
      navigate("/dashboard-orders");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const refundOrderUpdateHandler = async () => {
    await axios
      .put(
        `${server}/order/order-accept-refund/${id}`,
        { status },
        { withCredentials: true }
      )
      .then((response) => {
        toast.success(response.data.message);
        dispatch(getAllShopOrders(seller._id));
      })
      .catch(
        (error) =>
          toast.error(error.response.data.message) || "Failed to process refund"
      );
  };

  return (
    <div className={`py-4 min-h-screen ${styles.section}`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} className="text-[#3321c8]" />
          <h1 className="pl-2 text-[25px]">Order Details</h1>
        </div>
        <Link to="/dashboard-orders">
          <div
            className={`${styles.button} !bg-[#3321c8] !rounded-[4px] text-white font-[600] !h-[45px] text-[18px]`}
          >
            Order List
          </div>
        </Link>
      </div>
      {!orderDetails ? (
        <div className="w-full h-screen flex items-center justify-center">
          <ScaleLoader color="#3321c8" height={50} width={4} />
        </div>
      ) : (
        <>
          <div className="w-full flex items-center justify-between pt-6">
            <h5 className="text-[#00000084]">
              Order ID: <span>#{orderDetails._id}</span>
            </h5>
            <h5 className="text-[#00000084]">
              Placed on:{" "}
              <span>
                {new Date(orderDetails.createdAt).toLocaleDateString()}
              </span>
            </h5>
          </div>

          <br />
          <hr className="mb-4 bg-blue-600" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {orderDetails.cart.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-sm overflow-hidden shadow-md hover:shadow-lg"
              >
                <img
                  src={`${imageUrl}${item.product.images[1].url}`}
                  alt={item.product.name}
                  className="w-full h-64 object-contain p-2"
                />
                <div className="p-4">
                  <h3 className="text-gray-900 font-semibold text-lg mb-2">
                    {item.product.name}
                  </h3>
                  <p className="text-gray-700">
                    ${item.product.discountPrice} x {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <hr className="mt-4" />

          <div className="border-t border-gray-200 pt-6">
            <h5 className="text-right text-lg font-semibold">
              Total Price:{" "}
              <span className="text-primary">US${orderDetails.totalPrice}</span>
            </h5>
          </div>

          <div className="flex flex-col md:flex-row mt-8">
            <div className="md:w-1/2">
              <h4 className="text-lg font-semibold">Shipping Address:</h4>
              <div className="mt-3">
                <p className="text-base">
                  {orderDetails.shippingAddress.address1}
                </p>
                <p className="text-base">
                  {orderDetails.shippingAddress.address2}
                </p>
                <p className="text-base">
                  {orderDetails.shippingAddress.country}
                </p>
                <p className="text-base">{orderDetails.shippingAddress.city}</p>
                <p className="text-base">
                  Phone: {orderDetails.user.phoneNumber}
                </p>
              </div>
            </div>

            <div className="md:w-1/2 mt-4 md:mt-0 md:pl-6">
              <h4 className="text-lg font-semibold">Payment Info:</h4>
              <p className="text-base mt-3">
                Status:{" "}
                <span className="text-primary">
                  {orderDetails.paymentInfo.status
                    ? orderDetails.paymentInfo.status
                    : "Not Paid"}
                </span>
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h4 className="text-lg font-semibold">Order Status:</h4>
            {orderDetails.status !== "Processing refund" &&
              orderDetails.status !== "Refund Success" && (
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-48 md:w-64 mt-2 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary"
                >
                  {[
                    "Processing",
                    "Transferred to delivery partner",
                    "Shipping",
                    "Received",
                    "On the way",
                    "Delivered",
                  ]
                    .slice(
                      [
                        "Processing",
                        "Transferred to delivery partner",
                        "Shipping",
                        "Received",
                        "On the way",
                        "Delivered",
                      ].indexOf(orderDetails.status)
                    )
                    .map((option, index) => (
                      <option value={option} key={index}>
                        {option}
                      </option>
                    ))}
                </select>
              )}
            {orderDetails.status === "Processing refund" ||
            orderDetails.status === "Refund Success" ? (
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-48 md:w-64 mt-2 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary"
              >
                {["Processing refund", "Refund Success"]
                  .slice(
                    ["Processing refund", "Refund Success"].indexOf(
                      orderDetails.status
                    )
                  )
                  .map((option, index) => (
                    <option value={option} key={index}>
                      {option}
                    </option>
                  ))}
              </select>
            ) : null}
          </div>

          <button
            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-primary-dark focus:outline-none focus:bg-primary-dark"
            onClick={
              orderDetails.status !== "Processing refund"
                ? orderUpdateHandler
                : refundOrderUpdateHandler
            }
          >
            Update Status
          </button>
        </>
      )}
    </div>
  );
};

export default OrderDetails;
