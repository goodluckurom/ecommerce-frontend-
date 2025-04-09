/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import { imageUrl } from "../../../server";
import Spinner from "../../Layout/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";
import Toast from "../../Toast";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { toastConfig } from "../../../utils/helpers";
import Ratings from "../../Ratings";

const ProductCard = ({ data }) => {
  const { isSeller } = useSelector((state) => state.seller);
  const { isAuthenticated } = useSelector((state) => state.user);
  const { success, cart } = useSelector((state) => state.cart);
  const { wishlist, isSuccess } = useSelector((state) => state.wishlist);

  const [open, setOpen] = useState(false);
  const [quantity] = useState(1);
  const dispatch = useDispatch();
  const d = data.name;
  const product_name = d.replace(/\s+/g, "-");

  //add to cart function
  const handleAddToCart = (productId, quantity, data) => {
    dispatch(addToCart(productId, quantity, isAuthenticated));
    if (success) {
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

  //remove from cart function
  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId, isAuthenticated));
    if (success) {
      toast.success(
        <Toast
          imageUrl={`${imageUrl}${data.images[0].url}`}
          productName={data.name}
          actionType="remove-from-cart"
        />,
        toastConfig
      );
    }
  };
  //add to wishlist function
  const handleAddtoWishlist = (productId) => {
    dispatch(addToWishlist(productId, quantity, isAuthenticated));
    if (isSuccess) {
      toast.success(
        <Toast
          imageUrl={`${imageUrl}${data.images[0].url}`}
          productName={data.name}
          actionType="add-to-wishlist"
        />,
        toastConfig
      );
    }
  };
  //remove from wishlist function
  const handleRemoveFromWishlist = (productId) => {
    console.log("remove from wishlist function called");
    dispatch(removeFromWishlist(productId, isAuthenticated));

    if (isSuccess) {
      toast.success(
        <Toast
          imageUrl={`${imageUrl}${data.images[0].url}`}
          productName={data.name}
          actionType="remove-from-wishlist"
        />,
        toastConfig
      );
    }
  };

  const isProductInCart = (cart, productId) => {
    return cart.some((item) => item.product === productId);
  };
  const isProductInWishlist = (wishlist, productId) => {
    return wishlist.some((item) => item.product === productId);
  };
  const isInWishlist = isProductInWishlist(wishlist, data._id);

  const isInCart = isProductInCart(cart, data._id);

  return (
    <>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm relative p-3 cursor-pointer">
        <div className="flex justify-end"></div>
        <Link to={`/product/${product_name}`}>
          {data && data.images && data.images[0] ? (
            <img
              src={`${imageUrl}${data.images[0].url}`}
              alt="Product image"
              className="w-full h-[170px] object-contain lg:p-2"
            />
          ) : (
            <div className="w-full h-[170px] object-contain lg:p-2 bg-gray-200 flex items-center justify-center">
              <Spinner />
            </div>
          )}
        </Link>
        <Link
          to={
            isSeller
              ? `/shop/${data.shop._id}`
              : `/shop/preview/${data.shop._id}`
          }
        >
          <h5 className={`${styles.shop_name}`}>{data.shop.shop_name}</h5>
        </Link>
        <Link to={`/product/${product_name}`}>
          <h4 className="pb-3 font-[500]">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>
          <Ratings rating={data?.ratings} />

          {/* 
          <div className="flex">
            <AiFillStar
              className="mr-2 cursor-pointer"
              color="#f6BA00"
              size={20}
            />
            <AiFillStar
              className="mr-2 cursor-pointer"
              color="#f6BA00"
              size={20}
            />
            <AiFillStar
              className="mr-2 cursor-pointer"
              color="#f6BA00"
              size={20}
            />
            <AiFillStar
              className="mr-2 cursor-pointer"
              color="#f6BA00"
              size={20}
            />
            <AiOutlineStar
              className="mr-2 cursor-pointer"
              color="#f6BA00"
              size={20}
            />
          </div> */}
          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h5 className={`${styles.productDiscountPrice}`}>
                {data.price === 0 ? data.price : data.discountPrice}$
              </h5>
              <h4 className={`${styles.price}`}>
                {data.price ? data.price + "$" : null}
              </h4>
            </div>
            <span className="font-[400] text-[17px] text-[#68d284]">
              {data?.sold_out} sold
            </span>
          </div>
        </Link>
        <div>
          {isInWishlist ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute  right-2 top-5"
              onClick={() => handleRemoveFromWishlist(data._id)}
              color="#3321c8"
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => handleAddtoWishlist(data._id)}
              color="#3321c8"
              title="Add to wishlist"
            />
          )}
          <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-2 top-14"
            onClick={() => setOpen(!open)}
            color="#3321c8"
            title="Quick view"
          />
          {isInCart ? (
            <FaShoppingCart
              size={25}
              className="cursor-pointer absolute right-2 top-24"
              color="#3321c8"
              title="Remove from cart"
              onClick={() => handleRemoveFromCart(data._id)}
            />
          ) : (
            <AiOutlineShoppingCart
              size={25}
              className="cursor-pointer absolute right-2 top-24"
              color="#3321c8"
              title="Add to cart"
              onClick={() => handleAddToCart(data._id, quantity)}
            />
          )}

          {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
