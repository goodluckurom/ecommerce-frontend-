/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import CountDown from "./CountDown";
import { imageUrl } from "../../server";
import Spinner from "../Layout/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cart";
import { useState } from "react";
import { toast } from "react-toastify";

const EventCard = ({ active, data }) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const { cart, success } = useSelector((state) => state.cart);
  const [quantity] = useState(1);
  const dispatch = useDispatch();

  const addToCartHandler = (eventId) => {
    const isProductInCart = cart.some((item) => item.product === eventId);
    if (isProductInCart) {
      toast.error("Product is Already in cart");
      return;
    } else {
      dispatch(addToCart(eventId, quantity, isAuthenticated));
      if (success) {
        toast.success("Product Added to cart");
      }
    }
  };

  return (
    <div
      className={`w-full block bg-white rounded-lg ${
        active ? "unset" : "mb-12"
      } lg:flex p-2 h-auto`}
    >
      <div className="w-full lg:w-[50%] m-auto p-4">
        {data && data.images && data.images[0] ? (
          <img src={`${imageUrl}${data.images[0].url}`} alt="" />
        ) : (
          <div className="w-full h-[170px] object-contain lg:p-2 bg-gray-200 flex items-center justify-center">
            <Spinner />
          </div>
        )}
      </div>
      <div className="w-full lg:w-[50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>{data?.name}</h2>
        <p>{data?.description}</p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              {data?.originalPrice}$
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              {data?.discountPrice}$
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            {data?.sold_out} sold
          </span>
        </div>
        <CountDown data={data} />
        <br />
        <div className="flex items-center">
          <Link to={`/product/${data?.name}?isEvent=true`}>
            <div className={`${styles.button} text-[#fff] bg-blue-600`}>
              See Details
            </div>
          </Link>
          <div
            className={`${styles.button} text-[#fff] ml-5 bg-blue-600`}
            onClick={() => addToCartHandler(data)}
          >
            Add to cart
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
