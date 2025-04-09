import { useEffect, useState } from "react";
import styles from "../../styles/styles";
import ShippingInfo from "./ShippingInfo";
import { useSelector } from "react-redux";
import CartData from "./CartData";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";

const Checkout = () => {
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [userInfo, setUserInfo] = useState(false);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [discountDetails, setDiscountDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const subTotalPrice = cart.reduce((acc, item) => {
    return acc + item.quantity * item.product.discountPrice;
  }, 0);

  const shipping = subTotalPrice * 0.1;

  const totalPrice = (subTotalPrice + shipping - discountPrice).toFixed(2);

  const paymentSubmit = () => {
    if (
      address1 === "" ||
      address2 === "" ||
      zipCode === null ||
      country === "" ||
      city === ""
    ) {
      toast.error("Please choose your delivery address!");
    } else {
      const shippingAddress = {
        address1,
        address2,
        zipCode,
        country,
        city,
      };

      const orderData = {
        cart,
        totalPrice,
        subTotalPrice,
        shipping,
        discountPrice,
        shippingAddress,
        user,
      };

      localStorage.setItem("latestOrder", JSON.stringify(orderData));
      navigate("/payment");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (couponApplied) {
      toast.error("Only one coupon can be used per purchase");
      return;
    }
    try {
      const { data } = await axios.get(
        `${server}/coupon/get-coupoun-value/${couponCode}`
      );
      console.log("coupon code", data);

      if (data.success && data.coupounCode) {
        const couponShopId = data.coupounCode.shopId;
        const couponCodeValue = data.coupounCode.value;
        const today = new Date().toISOString().slice(0, 10);
        const couponExpiry = data.coupounCode.expires_At;

        if (couponExpiry < today) {
          toast.error("Coupon code has expired!");
          return;
        }

        if (
          data.coupounCode.minAmount &&
          subTotalPrice < data.coupounCode.minAmount
        ) {
          toast.error("Minimum purchase amount not met for this coupon");
          return;
        }

        const isValidCoupon =
          cart && cart.filter((item) => item.product.shop === couponShopId);

        if (isValidCoupon.length === 0) {
          toast.error("Coupon code is not valid for the selected products");
          setCouponCode("");
        } else {
          const eligiblePrice = isValidCoupon.reduce(
            (acc, item) => acc + item.quantity * item.product.discountPrice,
            0
          );

          const calculatedDiscountPrice =
            (eligiblePrice * couponCodeValue) / 100;
          setDiscountPrice(calculatedDiscountPrice);
          setCouponCodeData(data.coupounCode);
          setCouponCode("");
          setCouponApplied(true);

          // Calculate and store discount details
          const discountDetails = isValidCoupon.map((item) => {
            const itemDiscount =
              (item.product.discountPrice * couponCodeValue) / 100;
            return {
              ...item,
              discount: item.quantity * itemDiscount,
            };
          });
          setDiscountDetails(discountDetails);
        }
      } else {
        toast.error("Coupon code is invalid");
        setCouponCode("");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching coupon details");
    }
  };

  return (
    <div className=" w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <ShippingInfo
            user={user}
            country={country}
            setCountry={setCountry}
            state={state}
            setState={setState}
            city={city}
            setCity={setCity}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            address1={address1}
            setAddress1={setAddress1}
            address2={address2}
            setAddress2={setAddress2}
            zipCode={zipCode}
            setZipCode={setZipCode}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData
            handleSubmit={handleSubmit}
            totalPrice={totalPrice}
            discountPrice={discountPrice}
            shipping={shipping}
            subTotalPrice={subTotalPrice}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            discountPercentage={discountPrice}
            discountDetails={discountDetails}
          />
        </div>
      </div>
      <div
        className={`${styles.button} bg-[#3957db] w-[150px] 800px:w-[280px] mt-10`}
        onClick={paymentSubmit}
      >
        <h5 className="text-white">Go to Payment</h5>
      </div>
    </div>
  );
};

export default Checkout;
