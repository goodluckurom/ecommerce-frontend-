import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserOrders } from "../../redux/actions/order";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdLocationOn, MdLocalShipping, MdDone } from "react-icons/md";
import { FaTruckMoving, FaRegSadTear } from "react-icons/fa";
import { imageUrl } from "../../server";

const TrackOrderStatus = () => {
  const { user } = useSelector((state) => state.user);
  const { orders, loading } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    if (user && user._id) {
      dispatch(getUserOrders(user._id));
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (orders) {
      const data = orders.find((item) => item._id === id);
      setOrderData(data);
    }
  }, [orders, id]);

  const getStatusMessage = (status) => {
    switch (status) {
      case "Processing":
        return "Your order is being processed in the store.";
      case "Transferred to delivery partner":
        return "Your Order is on the way to the delivery partner.";
      case "Shipping":
        return "Your Order is on the way with our delivery partner.";
      case "Received":
        return "Your Order is in your city. Our Delivery man will deliver it.";
      case "On the way":
        return "Our Delivery man is going to deliver your order.";
      case "Delivered":
        return "Your order is delivered!";
      case "Processing refund":
        return "Your refund is processing!";
      case "Refund Success":
        return "Your refund is successful!";
      default:
        return "Unknown status";
    }
  };

  const getIcon = (status) => {
    switch (status) {
      case "Processing":
        return <AiOutlineLoading3Quarters className="animate-spin" />;
      case "Transferred to delivery partner":
        return <MdLocalShipping />;
      case "Shipping":
        return <FaTruckMoving />;
      case "Received":
        return <MdLocationOn />;
      case "On the way":
        return <FaTruckMoving />;
      case "Delivered":
        return <MdDone />;
      case "Processing refund":
        return <AiOutlineLoading3Quarters className="animate-spin" />;
      case "Refund Success":
        return <MdDone />;
      default:
        return <FaRegSadTear />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Processing":
      case "Processing refund":
        return "text-yellow-500";
      case "Transferred to delivery partner":
      case "Shipping":
      case "On the way":
        return "text-blue-500";
      case "Received":
        return "text-orange-500";
      case "Delivered":
      case "Refund Success":
        return "text-green-500";
      default:
        return "text-red-500";
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-start justify-center p-4 overflow-y-scroll">
      {loading ? (
        <AiOutlineLoading3Quarters className="animate-spin text-4xl" />
      ) : orderData ? (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
          <h1 className="text-2xl font-bold mb-4">Track Your Order</h1>
          <h2 className="text-lg mb-2">Order ID: {orderData._id}</h2>
          <h3 className="text-md mb-4">
            Placed on: {new Date(orderData.createdAt).toLocaleDateString()}
          </h3>
          <div className="flex items-center mb-6">
            <div className={`text-3xl ${getStatusColor(orderData.status)}`}>
              {getIcon(orderData.status)}
            </div>
            <p className="ml-4 text-lg">{getStatusMessage(orderData.status)}</p>
          </div>
          <div className="mb-4">
            <h4 className="text-lg font-semibold">Shipping Address:</h4>
            <p>{orderData.shippingAddress.address1}</p>
            <p>{orderData.shippingAddress.address2}</p>
            <p>
              {orderData.shippingAddress.city},{" "}
              {orderData.shippingAddress.zipCode}
            </p>
            <p>{orderData.shippingAddress.country}</p>
          </div>
          <div className="mb-4">
            <h4 className="text-lg font-semibold">Items:</h4>
            {orderData.cart.map((item) => (
              <div
                key={item.product._id}
                className="flex justify-between items-center py-2"
              >
                <img
                  src={`${imageUrl}${item.product?.images[0].url}`}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <p>{item.product.name}</p>
                <p>Qty: {item.quantity}</p>
                <p>${item.product.discountPrice * item.quantity}</p>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <h4 className="text-lg font-semibold">Total Price:</h4>
            <p>${orderData.totalPrice}</p>
          </div>
          <div className="mb-4">
            <h4 className="text-lg font-semibold">Payment Info:</h4>
            <p>Status: {orderData.paymentInfo.status}</p>
            <p>Payment Type: {orderData.paymentInfo.type}</p>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl text-red-500">Order not found</h1>
        </div>
      )}
    </div>
  );
};

export default TrackOrderStatus;
