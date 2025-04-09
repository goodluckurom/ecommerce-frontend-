/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getWishlistProducts,
  removeFromWishlist,
} from "../../redux/actions/wishlist";
import { imageUrl } from "../../server";
import Loader from "../Layout/Loader";
import { IoGift } from "react-icons/io5";
import { BsCartPlus } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./wishlistAnimations.css";
import { addToCart } from "../../redux/actions/cart";
import Toast from "../Toast";
import { toast } from "react-toastify";
import NotFound from "../Layout/NotFound";

const Wishlist = ({ setOpenWishlist }) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const { wishlist, isLoading } = useSelector((state) => state.wishlist);
  const [wishlistItems, setWishlistItems] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWishlistProducts(isAuthenticated));
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (wishlist) {
      setWishlistItems(wishlist);
    }
  }, [wishlist]);

  return (
    <div
      className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10"
      onClick={() => setOpenWishlist(false)}
    >
      <div
        className={`fixed top-0 right-0 h-full w-[80%]  800px:w-[40%] bg-white flex flex-col justify-between shadow-sm ${
          wishlist.length === 0 ? "overflow-y-hidden" : "overflow-y-scroll"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full h-screen flex items-center justify-center">
          <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
            <RxCross1
              size={25}
              className="cursor-pointer"
              color="#3957db"
              onClick={() => setOpenWishlist(false)}
            />
          </div>
          {/**item length */}
          {wishlist.length < 1 ? (
            <div className="flex items-center justify-center relative h-screen">
              <div className="">
                <NotFound />
              </div>
              <h2 className=" lg:absolute lg:bottom-20 font-bold text-lg text-blue-500">
                Wishlist is empty...
              </h2>
            </div>
          ) : (
            <div className={`${styles.noramlFlex} p-4`}>
              <IoGift size={25} color="#3957db" />
              <h5 className="pl-2 text-[20px] font-[500]">
                <span className="text-[#3957db]">
                  {wishlistItems && wishlistItems.length}
                </span>
                {wishlistItems.length > 1 ? " Items" : " Item"}
              </h5>
            </div>
          )}
        </div>
        {/**wishlist single item */}
        <br />
        {isLoading ? (
          <Loader />
        ) : (
          <div className="w-full border-t">
            <TransitionGroup>
              {wishlistItems &&
                wishlistItems.map((item) => (
                  <CSSTransition
                    key={item.product._id}
                    timeout={300}
                    classNames="wishlist-item"
                  >
                    <WishListSingle data={item} key={item.product._id} />
                  </CSSTransition>
                ))}
            </TransitionGroup>
          </div>
        )}
        <br />
      </div>
    </div>
  );
};

const WishListSingle = ({ data }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const { success } = useSelector((state) => state.cart);

  const [quantity] = useState(1);

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId, isAuthenticated));
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

  const handleAddToCartFromWishlist = (productId, quantity, data) => {
    //to remove the product from the wishlist
    dispatch(removeFromWishlist(productId, isAuthenticated));
    //to add the product to cart
    dispatch(addToCart(productId, quantity, isAuthenticated));
    if (success) {
      toast.success(
        <Toast
          imageUrl={`${imageUrl}${data.images[0]?.url}`}
          productName={data.name}
          actionType="add-to-cart"
        />,
        toastConfig
      );
    }
  };
  return (
    <div className="border-b p-4">
      <div className="w-full 800px:flex items-center justify-between">
        <RxCross1
          className="cursor-pointer 800px:mb-['unset'] 800px:ml-['unset'] mb-2 ml-2"
          color="#3957db"
          title="Remove from wishlist"
          onClick={() => handleRemoveFromWishlist(data.product._id)}
          size={20}
        />
        <img
          src={
            data.product &&
            data.product.images &&
            data.product.images[0] &&
            data.product.images[0].url
              ? `${imageUrl}${data.product.images[0].url}`
              : ""
          }
          alt={data.product && data.product.name}
          className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
        />
        <div className="pl-[5px]">
          <h1>{data.product.name}</h1>
          <h4 className="font-[600] pt-3 800px:pt-[3px] text-[17px] text-[#d02222] font-Roboto">
            US${data.product.discountPrice}
          </h4>
        </div>
        <div>
          <BsCartPlus
            size={25}
            className="cursor-pointer"
            title="Add to cart"
            color="#3957db"
            onClick={() =>
              handleAddToCartFromWishlist(
                data.product._id,
                quantity,
                data.product
              )
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
