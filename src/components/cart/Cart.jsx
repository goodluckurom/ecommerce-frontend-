/* eslint-disable react/prop-types */
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "../../styles/styles";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCartProducts, removeFromCart } from "../../redux/actions/cart";
import { imageUrl } from "../../server";
import Loader from "../Layout/Loader";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./cartAnimations.css";
import EmptyCart from "../Layout/EmptyCart";

const Cart = ({ setOpenCart }) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const { cart, isLoading } = useSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartProducts(isAuthenticated));
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (cart) {
      setCartItems(cart);
    }
  }, [cart]);

  const calculateTotalPrice = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.prodcut && item.product.discountPrice * item.quantity;
    });
    return total;
  };

  return (
    <div
      className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10"
      onClick={() => setOpenCart(false)}
    >
      <div
        className="fixed top-0 right-0 h-full w-[80%] 800px:w-[40%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full h-screen flex items-center justify-center">
          <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3 rounded-full">
            <button className="hover:border-2 hover:boder-gray-400 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-gray-400 rounded-full p-2">
              <RxCross1
                size={25}
                className="cursor-pointer"
                color="#3957db"
                onClick={() => setOpenCart(false)}
              />
            </button>
          </div>
          {/* Display cart item count */}
          {cart.length === 0 ? (
            <div className="flex  flex-col items-center justify-center overflow-y-hidden relative">
              <div
                className="
               lg:h-[60vh]"
              >
                <EmptyCart />
              </div>
              <h2 className=" lg:absolute lg:bottom-20 font-bold text-lg text-blue-500">
                Cart is empty...
              </h2>
            </div>
          ) : (
            <div className={`${styles.noramlFlex} p-4`}>
              <IoBagHandleOutline size={25} color="#3957db" />
              <h5 className="pl-2 text-[20px] font-[500]">
                <span className="text-[#3957db]">
                  {cartItems && cartItems.length}
                </span>
                {cartItems.length === 1 ? " Item" : " Items"}
              </h5>
            </div>
          )}
        </div>

        {/**cart single item */}
        <br />
        {isLoading ? (
          <Loader />
        ) : (
          <div className="w-full border-t">
            <TransitionGroup>
              {cartItems.map((item) => (
                <CSSTransition
                  key={item.product && item.product._id}
                  timeout={300}
                  classNames="cart-item"
                >
                  <CartSingle data={item && item} setCartItems={setCartItems} />
                </CSSTransition>
              ))}
            </TransitionGroup>
          </div>
        )}
        <br />
        {/* Checkout button */}
        <div className="px-5 mb-3">
          {cart.length > 0 ? (
            <Link to="/checkout">
              <div
                className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`}
              >
                <h1 className="text-white text-[18px] font-[600]">
                  Checkout Now (USD${calculateTotalPrice()})
                </h1>
              </div>
            </Link>
          ) : (
            <div
              className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343]/50 rounded-[5px]  cursor-not-allowed`}
            >
              <h1 className="text-white text-[18px] font-[600]">
                Checkout Now (USD${calculateTotalPrice()})
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CartSingle = ({ data, setCartItems }) => {
  const [value, setValue] = useState(data.quantity);
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const totalPrice = data.product.discountPrice * value;

  const handleQuantityChange = (change) => {
    if (value + change > 0) {
      setValue(value + change);
      // Update cart quantity on server (implement API call here)
    }
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId, isAuthenticated)).then(() => {
      // Remove the item from the local state
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.product._id !== productId)
      );
    });
  };

  return (
    <div className="border-b p-4">
      <div className=" w-full flex items-center justify-between">
        <div>
          <div
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
            onClick={() => handleQuantityChange(1)}
          >
            <HiPlus size={18} color="#fff" />
          </div>
          <span className="pl-[10px]">{value}</span>
          <div
            className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => handleQuantityChange(-1)}
          >
            <HiOutlineMinus size={16} color="#7d879c" />
          </div>
        </div>
        <img
          src={
            data.product &&
            data.product.images &&
            data.product.images[0] &&
            data.product.images[0].url
              ? `${imageUrl}${data.product.images[0].url}`
              : ""
          }
          alt="Product image"
          className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
        />
        <div className="pl-[5px]">
          <h1>{data.product.name}</h1>
          <h4 className="font-[400] text-[15px] text-[#00000082]">
            ${data.product.discountPrice} * {value}
          </h4>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            US${totalPrice}
          </h4>
        </div>
        <RxCross1
          className="cursor-pointer"
          color="#3957db"
          size={20}
          onClick={() => handleRemoveItem(data.product._id)}
        />
      </div>
    </div>
  );
};

export default Cart;
