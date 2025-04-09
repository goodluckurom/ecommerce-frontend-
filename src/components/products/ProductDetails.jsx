/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import styles from "../../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FiArrowUpRight } from "react-icons/fi";
// import { Link, useParams, useSearchParams } from "react-router-dom";
import { imageUrl, server } from "../../server";
import { toast } from "react-toastify";
// import axios from "axios";
import Loader from "../Layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist";
import Toast from "../Toast";
import { toastConfig } from "../../utils/helpers";
import { addToCart } from "../../redux/actions/cart";
import { Link, useNavigate } from "react-router-dom";
import Ratings from "../Ratings";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const ProductDetails = ({ data }) => {
  const [select, setSelect] = useState(0);
  const [count, setCount] = useState(1);
  const [quantity, setQuantity] = useState(1);
  // const [data, setData] = useState(null);
  const { isSeller } = useSelector((state) => state.seller);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSuccess, wishlist } = useSelector((state) => state.wishlist);
  const { cart, success } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.products);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const imgRef = useRef(null);

  // const { name } = useParams();
  // const [searchParams] = useSearchParams();
  // const eventName = searchParams.get("isEvent");
  // const productName = name.replace(/-/g, " ");

  // useEffect(() => {
  //   const fetchProductByName = async (productName) => {
  //     try {
  //       let productUrl = `${server}/product/get-product-by-name/${productName}`;

  //       if (eventName) {
  //         productUrl = `${server}/event/get-event-by-name/${productName}`;
  //         const { data } = await axios.get(productUrl);
  //         setData(data.event);
  //       } else {
  //         setData(data.product);
  //       }
  //     } catch (error) {
  //       toast.error(
  //         "THIS ERROR IS COMING FROM THE PRODUCT DETAILS------Error fetching product data!!.."
  //       );
  //     }
  //   };
  //   fetchProductByName(productName);
  // }, [productName, eventName, data]);

  useEffect(() => {
    if (data && data.shop._id) {
      dispatch(getAllProductsShop(data.shop._id));
    }
  }, [dispatch, data]);

  const incrementCount = () => {
    setCount(count + 1);
    setQuantity(count);
  };
  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
      setQuantity(count);
    }
  };

  //wishlist handlers
  const isProductInWishlist = (wishlist, productId) => {
    return wishlist.some((item) => item.product === productId);
  };
  const isInWishlist = isProductInWishlist(wishlist, data && data._id);

  const addToWishlistHandler = (productId) => {
    dispatch(addToWishlist(productId, isAuthenticated));
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
  const removeFromWishlistHandler = (productId) => {
    dispatch(removeFromWishlist(productId, isAuthenticated));
  };

  //cart handlers
  const isProductInCart = (cart, productId) => {
    return cart.some((item) => item.product === productId);
  };
  const isInCart = isProductInCart(cart, data && data._id);

  //add to cart function
  const handleAddtoCart = (productId) => {
    if (isInCart) {
      toast.error("product is already in cart");
      return;
    } else if (quantity > data.stock) {
      toast.error("Quantity exceeds the available stock");
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

  //function to zoom out the part of the picture the mouse is on
  const handleMouseMove = (event) => {
    const img = imgRef.current;
    const rect = img.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    img.style.transformOrigin = `${x * 100}% ${y * 100}%`; // Set the zoom origin based on mouse position
    img.style.transform = "scale(2)"; // Zoom in by scaling the image
  };
  //function to cancel the zoom on mouse exit
  const handleMouseLeave = () => {
    const img = imgRef.current;
    img.style.transform = "none";
  };

  const handleImageSelect = (index) => {
    setSelect(index);
    const img = imgRef.current;
    img.style.transform = "none";
  };

  if (!data) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const handleScroll = () => {
    window.scrollTo({
      top: window.scrollY + 550,
      behavior: "smooth",
    });
  };

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );
  const avg = totalRatings / totalReviewsLength || 0;

  const averageRating = avg.toFixed(2);

  const handleMessage = async () => {
    if (isAuthenticated) {
      const groupTitle = data._id + user._id;
      const sellerId = data.shop._id;
      const userId = user._id;
      try {
        const { data } = await axios.post(`${server}/chat/create-new-chat`, {
          groupTitle,
          userId,
          sellerId,
        });
        navigate(`/inbox?${data.chat._id}`);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      toast.error("Login to chat with the seller");
    }
  };

  return (
    <div className="bg-white">
      {data && (
        <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex">
              {/** */}
              <div className="w-full 800px:w-[50%] pt-5">
                <div className="overflow-hidden relative hover:cursor-zoom-in">
                  <img
                    ref={imgRef}
                    src={data && ` ${imageUrl}${data?.images[select]?.url}`}
                    alt="Product image"
                    className="w-[70%] h-[50%]"
                    style={{ transform: "scale(1)" }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  />

                  <div className="absolute inset-0 border border-gray-300 hidden"></div>
                </div>
                <div className="w-[90%] flex pt-5 ">
                  {data?.images.map((i, index) => (
                    <div
                      key={index}
                      className={`${
                        select === index
                          ? "border border-[#3957db] rounded-lg shadow-lg"
                          : "null"
                      } cursor-pointer p-2 md:p-5 pl-2 md:pl-5 flex items-center justify-center`}
                    >
                      <img
                        src={`${imageUrl}${i?.url}`}
                        alt=""
                        className="overflowx-scroll  mr-3 mt-2 md:mt-5 h-[150px] md:h-[100px] w-[150px] md:w-[150px]"
                        onClick={() => handleImageSelect(index)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full 800px:w-[50%] pt-5 pl-5">
                <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                <p>
                  {data.description.length > 600 ? (
                    <>
                      {data.description.slice(0, 700) + "..."} <span> </span>
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
                        onClick={handleScroll}
                      >
                        Readmore...
                      </button>
                    </>
                  ) : (
                    data.description
                  )}
                </p>
                <div className="flex pt-3">
                  <h3 className={`${styles.productDiscountPrice} ml-3`}>
                    {data.discountPrice ? data.discountPrice + "$" : null}
                  </h3>
                  <h4 className={`${styles.price}`}>
                    {data.price ? data.price + "$" : null}
                  </h4>
                </div>
                <div className="flex items-center gap-10">
                  <h3 className="text-[#3328c1] font-bold">
                    {data.stock} Remaining
                  </h3>
                  <h3 className="text-red-600"> {data.sold_out} Sold</h3>
                </div>
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
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>
                  {/**Add to wishlist button */}
                  <div>
                    {isInWishlist ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => removeFromWishlistHandler(data._id)}
                        color="#3321c8"
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => addToWishlistHandler(data._id)}
                        color="#3321c8"
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>
                {/**Add to cart */}
                <div
                  className={`${styles.button} !mt-6 !rounded !h-11 flex items-center bg-[#3957db]`}
                  onClick={() => handleAddtoCart(data._id)}
                >
                  <span className="text-white flex items-center">
                    Add to cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
                <div className="flex items-center pt-8">
                  <Link
                    to={
                      isSeller
                        ? `/shop/${data.shop._id}`
                        : `/shop/preview/${data.shop._id}`
                    }
                  >
                    <img
                      src={`${imageUrl}${data?.shop?.avatar?.public_id}`}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full mr-2"
                    />
                  </Link>
                  <div className="pr-8">
                    <h3 className={`${styles.shop_name} pt-1 pb-1`}>
                      {data.shop.name}
                    </h3>
                    <h5 className="pb-5 text-[15px]">
                      ({data.shop.ratings}) Rating
                    </h5>
                  </div>
                  <div
                    className={`${styles.button} bg-[#3957db] hover:bg-[#3957fd] mt-4 rounded h-11`}
                    onClick={handleMessage}
                  >
                    <span className="text-white flex items-center ">
                      Send Message <AiOutlineMessage className="ml-3" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProductDetailsInfo
            data={data}
            totalReviewsLength={totalReviewsLength}
            averageRating={averageRating}
          />
          <br />
          <br />
        </div>
      )}
    </div>
  );
};

const ProductDetailsInfo = ({ data, totalReviewsLength }) => {
  const [active, setActive] = useState(1);
  const { products } = useSelector((state) => state.products);
  const { isSeller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();
  useEffect(() => {
    if (data && data.shop._id) {
      dispatch(getAllProductsShop(data.shop._id));
    }
  }, [dispatch, data]);

  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          {active === 1 ? (
            <div className={`${styles.active_indicator}`}></div>
          ) : null}
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
        </div>
        <div className="relative">
          {active === 2 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
        </div>
        <div className="relative">
          {active === 3 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
        </div>
      </div>
      <div>
        {active === 1 ? (
          <>
            <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
              {data.description}
            </p>
          </>
        ) : null}
        {active === 2 ? (
          <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
            <div className="w-full flex justify-center">
              {data.reviews.map((review, index) => (
                <div className="w-full flex my-2" key={index}>
                  <img
                    src={`${imageUrl}${review.user.avatar.public_id}`}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full"
                  />
                  <div className="flex flex-col">
                    <div className="pl-3">
                      <h1 className="font-[500] mr-3">{review.user.name}</h1>{" "}
                      <span>
                        {" "}
                        <Ratings rating={review.rating} />
                      </span>
                    </div>
                    <p className="pl-3">{review.comment}</p>
                  </div>
                </div>
              ))}
              <div className="w-full flex justify-center items-center">
                {data && data.reviews.length === 0 && (
                  <h5>
                    No Reviews for this product!...Buy the prduct and be this
                    first to review😊
                  </h5>
                )}
              </div>
            </div>
          </div>
        ) : null}
        {active === 3 && (
          <div className="w-full block 800px:flex p-5">
            <div className="w-full 800px:w-[50%]">
              <Link
                to={
                  isSeller
                    ? `/shop/${data.shop._id}`
                    : `/shop/preview/${data.shop._id}`
                }
              >
                <div className="flex items-center">
                  <img
                    src={`${imageUrl}${data?.shop?.avatar?.public_id}`}
                    className="w-[50px] h-[50px] rounded-full"
                    alt=""
                  />
                  <div className="pl-3">
                    <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                    <h5 className="pb-2 text-[15px]">
                      {/* ({averageRating}/5) ||5 Ratings Ratings */}rating
                    </h5>
                  </div>
                </div>
              </Link>
              <p className="pt-2">{data.shop.description}</p>
            </div>
            <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
              <div className="text-left">
                <h5 className="font-[600]">
                  Joined on:{" "}
                  <span className="font-[500]">
                    {data.shop?.createdAt?.slice(0, 10)}
                  </span>
                </h5>
                <h5 className="font-[600] pt-3">
                  Total Products:
                  <span className="font-[500]">
                    {products && products.length}
                  </span>
                </h5>
                <h5 className="font-[600] pt-3">
                  Total Reviews:
                  <span className="font-[500]">{totalReviewsLength}</span>
                </h5>
                <Link
                  to={
                    isSeller
                      ? `/shop/${data.shop._id}`
                      : `/shop/preview/${data.shop._id}`
                  }
                >
                  <div
                    className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3 bg-[#3957db]`}
                  >
                    <h4 className="text-white flex">
                      Visit Shop
                      <FiArrowUpRight />
                    </h4>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ProductDetails;
