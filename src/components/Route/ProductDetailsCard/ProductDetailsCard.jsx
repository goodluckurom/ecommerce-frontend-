/* eslint-disable react/prop-types */
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { imageUrl } from "../../../server";
import { addToCart } from "../../../redux/actions/cart";
import Toast from "../../Toast";
import { toast } from "react-toastify";

const ProductDetailsCard = ({ setOpen, data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { isSeller } = useSelector((state) => state.seller);
  const { isAuthenticated } = useSelector((state) => state.user);
  const { success, cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const incrementCount = () => {
    setCount(count + 1);
    console.log("current count is:", count);
    setQuantity(count + 1);
  };
  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
      setQuantity(count);
    }
  };

  const handleNavigate = (data) => {
    const d = data.name;
    const product_name = d.replace(/\s+/g, "-");
    navigate(`/product/${product_name}`);
    setOpen(false);
  };
  const toastConfig = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  const isProductInCart = (cart, productId) => {
    return cart.some((item) => item.product === productId);
  };
  const isInCart = isProductInCart(cart, data._id);

  const handleAddtoCart = (productId) => {
    if (quantity > data.stock) {
      toast.error("Quantity exceeds the available stock");
      return;
    }

    if (isInCart) {
      toast.error("product is already in cart");
      return;
    } else {
      dispatch(addToCart(productId, quantity, isAuthenticated));

      success &&
        toast.success(
          <Toast
            imageUrl={`${imageUrl}${data.images[0].url}`}
            productName={data.name}
            actionType="add-to-cart"
          />,
          toastConfig
        );
    }
  };

  return (
    <div className="bg-[#fff]">
      {data ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
          <div className="w-[90%] 800px:w-[70%] h-[90vh] overflow-y-scroll 800px:h-[90vh] bg-white rounded-md shadow-sm relative p-4">
            <RxCross1
              size={30}
              className="absolute right-3 top-3 z-50 "
              onClick={() => setOpen(false)}
              style={{
                color: "#3957db",
              }}
            />

            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%] px-8">
                <img
                  src={`${imageUrl}${data?.images[1]?.url}`}
                  alt="Product Image"
                />
                <div className="flex">
                  <Link
                    to={
                      isSeller
                        ? `/shop/${data.shop._id}`
                        : `/shop/preview/${data.shop._id}`
                    }
                    className="flex"
                  >
                    <img
                      src={`${imageUrl}${
                        data.shop && data?.shop?.avatar?.public_id
                      }`}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full mr-2"
                    />
                    <div>
                      <h3 className={`${styles.shop_name}`}>
                        {data.shop.name}
                      </h3>
                      <h5 className="pb-3 text-[15px]">
                        ({data?.shop.ratings}) Ratings
                      </h5>
                    </div>
                  </Link>
                </div>
                <div
                  className={`${styles.button} bg-[#3957db] mt-4 rounded-[4px] h-11`}
                >
                  <span className="text-[#fff] flex items-center">
                    Send Message <AiOutlineMessage className="ml-1" />
                  </span>
                </div>
                <div className="flex items-center gap-10 mt-5">
                  <h5 className="text-[16px] text-[red]">(50) Sold out</h5>
                  <h5 className="text-[16px] text-[#3321c8]">
                    {data.stock} Remaining
                  </h5>
                </div>
              </div>

              <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]">
                <h1 className={`${styles.productTitle} text-[20px]`}>
                  {data.name}
                </h1>
                <p>
                  {data.description.length > 900 ? (
                    <>
                      {data.description.slice(0, 900) + "..."}{" "}
                      <span>
                        <button
                          style={{
                            border: "2px solid #3957db",
                            backgroundColor: "#3957db",
                            color: "white",
                            padding: "10px 20px",
                            fontSize: "16px",
                            borderRadius: "5px",
                            cursor: "pointer",
                            outline: "none",
                          }}
                          className="hover:scale-[1.1] transition-all"
                          onClick={() => handleNavigate(data)}
                        >
                          Readmore...
                        </button>
                      </span>
                    </>
                  ) : (
                    data.description
                  )}
                </p>

                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.discountPrice}$
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.price ? data.price + "$" : null}
                  </h3>
                </div>
                {/** buttons and wishlist icon*/}
                <div className="flex items-center mt-12 justify-between pr-3">
                  <div>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={() => incrementCount()}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => setClick(!click)}
                        color={"#3957db"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        title="Add to wishlist"
                        onClick={() => setClick(!click)}
                        color="#3321c8"
                      />
                    )}
                  </div>
                </div>
                <div
                  onClick={() => handleAddtoCart(data._id)}
                  className={`${styles.button} mt-6 rounded-[4px] bg-[#3957db] h-11 flex items-center`}
                >
                  <span className="text-[#fff] flex items-center">
                    Add to cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default ProductDetailsCard;
