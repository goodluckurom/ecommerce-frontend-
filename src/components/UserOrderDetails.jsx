import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getUserOrders } from "../redux/actions/order";
import styles from "../styles/styles";
import { BsFillBagFill } from "react-icons/bs";
import { imageUrl, server } from "../server";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";

const UserOrderDetails = () => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getUserOrders(user._id));
  }, [dispatch, user._id]);

  const orderDetails = orders && orders.find((item) => item._id === id);

  const reviewHandler = async () => {
    await axios
      .put(
        `${server}/product/create-new-review`,
        {
          user,
          rating,
          comment,
          productId: selectedItem.product._id,
          orderId: id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        dispatch(getUserOrders(user._id));
        setRating(null);
        setComment("");
        setOpen(!open);
      })
      .catch((err) => toast.error(err.response.data.message || err));
  };

  const refundHandler = async () => {
    await axios
      .put(
        `${server}/order/order-refund/${id}`,
        { status: "Processing refund" },
        { withCredentials: true }
      )
      .then((response) => {
        toast.success(response.data.message);
        dispatch(getUserOrders(user._id));
      })
      .catch((error) => toast.error(error.response.data.message));
  };

  return (
    <div className={`py-4min-h-screen ${styles.section}`}>
      <div className="w-full flex items-center justify-center">
        <div className="flex items-center mt-5">
          <BsFillBagFill size={30} color="#3321c8" />
          <h1 className=" pl-2 text-[25px] ">Order detials</h1>
        </div>
      </div>

      <div className="w-full flex items-center justify-between pt-6">
        <h5 className="text-[#00000084]">
          Order ID: <span>#{orderDetails?._id?.slice(0, 8)}</span>
        </h5>
        <h5 className="text-[#00000084]">
          Placed on: <span>{orderDetails?.createdAt?.slice(0, 10)}</span>
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
            <div className="p-2">
              <h3 className="text-gray-900 font-semibold text-lg mb-2">
                {item.product.name}
              </h3>
              <p className="text-gray-700">
                ${item.product.discountPrice} x {item.quantity}
              </p>
            </div>
            {!item.isReviewed && orderDetails?.status === "Delivered" ? (
              <div
                className={`${styles.button} text-[#fff] bg-[#3321c8] ml-3`}
                onClick={() => {
                  setOpen(true);
                  setSelectedItem(item);
                }}
              >
                Write a review
              </div>
            ) : null}
          </div>
        ))}
      </div>

      {/* review pop up */}
      {open && (
        <div
          className=" w-full fixed top-0 left-0 h-screen bg-[#0005] z-50 flex items-center justify-center"
          onClick={() => {
            setOpen(!open);
            setRating(1);
          }}
        >
          <div
            className="w-[50%] h-min bg-[#fff] shadow rounded-md p-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex justify-end p-3">
              <button className="hover:border-2 hover:boder-gray-400 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-gray-400 rounded-full p-2">
                <RxCross1
                  size={30}
                  color="#3321c8"
                  onClick={() => {
                    setOpen(!open);
                    setRating(1);
                  }}
                  className="cursor-pointer"
                />
              </button>
            </div>
            <h2 className="text-[30px] font-[500] font-Poppins ml-3 ">
              Give A Review
            </h2>
            <br />
            <div className="w-full flex ml-3">
              <img
                src={`${imageUrl}${selectedItem?.product.images[0]?.url}`}
                alt=""
                className="w-[150px] h-[150px] object-contain"
              />
              <div className="flex items-center flex-col justify-center">
                <div className="pl-3 text-[20px]">
                  {selectedItem?.product.name}
                </div>
                <h4 className="pl-3 text-[20px]">
                  US${selectedItem?.product.discountPrice}
                </h4>
              </div>
            </div>

            <br />
            <br />
            {/* ratings */}
            <h5 className="pl-3 text-[20px] font-[500]">
              Give a Rating <span className="text-red-500">*</span>
            </h5>
            <div className="flex w-full ml-2 pt-1">
              {[1, 2, 3, 4, 5].map((i) =>
                rating >= i ? (
                  <AiFillStar
                    key={i}
                    className="mr-1 cursor-pointer"
                    color="rgb(246,186,0)"
                    size={25}
                    onClick={() => setRating(i)}
                  />
                ) : (
                  <AiOutlineStar
                    key={i}
                    className="mr-1 cursor-pointer"
                    color="rgb(246,186,0)"
                    size={25}
                    onClick={() => setRating(i)}
                  />
                )
              )}
            </div>
            <br />
            <div className="w-full ml-3">
              <label htmlFor="" className="block text-[20px] font-[500]">
                Write a comment
                <span className="ml-1 font-[400] text-[16px] text--[#00000052]">
                  (optional)
                </span>
              </label>
              <textarea
                name="comment"
                id=""
                cols="20"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="How was the product?..leave a review😊"
                className="mt-2 w-[95%] border p-2 outline-none"
              ></textarea>
            </div>
            <div
              className={`${styles.button} bg-[#3321c8] text-white text-[20px] ml-3`}
              onClick={rating > 1 ? reviewHandler : null}
            >
              Submit
            </div>
          </div>
        </div>
      )}
      <hr className="mt-4" />
      <div className="border-t w-full text-right">
        <h5 className="pt-3 text-[18px">
          Total Price: <strong> US${orderDetails.totalPrice}</strong>
        </h5>
      </div>
      <br />
      <br />
      <div className="w-full 800px:flex items-center">
        <div className="w-full 800px:w-[60%]">
          <h4 className="pt-3 text-[20px] font-[600]">Shipping Address:</h4>
          <h4 className="pt-3 text-[20px]">
            {orderDetails?.shippingAddress.address1 +
              " " +
              orderDetails?.shippingAddress.address2}
          </h4>
          <h4 className=" text-[20px]">
            {orderDetails?.shippingAddress.country}
          </h4>
          <h4 className=" text-[20px]">{orderDetails?.shippingAddress.city}</h4>
          <h4 className=" text-[20px]">{orderDetails?.user?.phoneNumber}</h4>
        </div>
        <div className="w-full 800px:w-[40%]">
          <h4 className="pt-3 text-[20px]">Payment Info:</h4>
          <h4>
            Status:{" "}
            {orderDetails?.paymentInfo?.status
              ? orderDetails?.paymentInfo?.status
              : "Not Paid"}
          </h4>
          <br />
          {orderDetails?.status === "Delivered" && (
            <div
              className={`${styles.button} text-white bg-[#3321c8]`}
              onClick={refundHandler}
            >
              Give a Refund
            </div>
          )}
        </div>
      </div>
      <br />
      <Link to="/">
        <div className={`${styles.button} bg-[#3321c8] text-white`}>
          Message Seller
        </div>
      </Link>
      <br />
      <br />
    </div>
  );
};

export default UserOrderDetails;
