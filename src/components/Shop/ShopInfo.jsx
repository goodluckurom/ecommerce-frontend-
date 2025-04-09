/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { imageUrl, server } from "../../server";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { getAllProductsShop } from "../../redux/actions/product";
import Loader from "../Layout/Loader";

const ShopInfo = ({ isOwner }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const { isSeller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    setIsLoading(true);

    const fetchShopInfo = async () => {
      try {
        const shopInfoUrl = `${server}/shop/get-shop-info/${id}`;
        const response = await axios.get(shopInfoUrl);
        setData(response.data.shop);
        setIsLoading(false);
      } catch (error) {
        toast.error(error);
        console.log("Error fetching shop info:", error);
      }
    };
    fetchShopInfo();
  }, [id, dispatch]);

  //log out function
  const logoutHandler = async () => {
    axios
      .get(`${server}/shop/logout`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        navigate("/shop-login");
        window.location.reload(true);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  //total reviews and ratings
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
  const averageRating = totalRatings / totalReviewsLength || 0;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="w-full py-5">
            <div className="w-full flex items-center justify-center">
              <img
                src={`${imageUrl}${data.avatar?.public_id}`}
                alt=""
                className="w-[150px] h-[150px] object-cover rounded-full"
              />
            </div>
            <h3 className="text-center py-2 text-[20px]">{data.shop_name}</h3>
            <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
              {data.shop_description}
            </p>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Address</h5>
            <h4 className="text-[#000000a6]">{data.address}</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Phone Number</h5>
            <h4 className="text-[#000000a6]">{data.phoneNumber}</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Total Products</h5>
            <h4 className="text-[#000000a6]">{products && products.length}</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Shop Rating</h5>
            <h4 className="text-[#000000a6]">{averageRating}</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Joined On</h5>
            <h4 className="text-[#000000b0]">
              {data?.createdAt?.slice(0, 10)}
            </h4>
          </div>
          {isOwner && (
            <div className="py-3 px-4">
              <Link to="/dashboard-settings">
                <div
                  className={`${styles.button} !w-full !h-[42px] !rounded-[5px] bg-[#3321c8]`}
                >
                  <span className="text-white">Edit Shop</span>
                </div>
              </Link>
              <div
                className={`${styles.button} !w-full !h-[42px] !rounded-[5px] bg-[#3321c8]`}
                onClick={logoutHandler}
              >
                <span className="text-white">Log Out</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default ShopInfo;
