import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../server";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import Loader from "../Layout/Loader";

const AllCoupons = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [minAmount, setMinAmount] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { products } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);
  const formInput = useRef();

  //to fetch the seller coupons
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${server}/coupon/shop-all-coupouns/${seller._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setIsLoading(false);
        setCoupons(res.data.shopCoupounCodes);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error);
      });
  }, [seller._id]);

  // Get the current date and format it to YYYY-MM-DD
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (e) => {
    const EndDate = new Date(e.target.value);
    setEndDate(EndDate);
  };

  //to create seller coupon
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = {
      name,
      value,
      minAmount,
      maxAmount,
      selectedProduct: selectedProducts,
      shopId: seller._id,
      expires_At: endDate,
    };

    try {
      const url = `${server}/coupon/create-coupon-code`;
      const res = await axios.post(url, formData, { withCredentials: true });
      toast.success(res.data.message);
      setOpen(false);
      setTimeout(() => {
        window.location.reload(true);
      }, 300);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDelte = async (couponId) => {
    try {
      const res = await axios.delete(
        `${server}/coupon/shop-delete-coupon/${couponId}`,
        { withCredentials: true }
      );
      if (res.data.success === true) {
        toast.success(res.data.message);
        window.location.reload(true);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <div className="w-full flex justify-end">
            <div
              className={`${styles.button} bg-[#3321c8] !w-max !h-[45px] p-3 !rounded-[5px] mr-[3px] mb-3`}
              onClick={() => setOpen(true)}
            >
              <span className="text-white">Create Coupon</span>
            </div>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr className="bg-[#3321c8] text-white">
                <th className="px-3 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                  Id
                </th>
                <th className="px-2 py-1 text-left text-xs font-medium  uppercase tracking-wider">
                  Coupon Code
                </th>
                <th className="px-2 py-1 text-left text-xs font-medium  uppercase tracking-wider">
                  Value
                </th>
                <th className="px-2 py-1 text-left text-xs font-medium  uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {coupons.map((coupon, index) => (
                <tr key={coupon.id}>
                  <td className="px-2 py-1 whitespace-nowrap text-sm text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-2 py-1 whitespace-nowrap text-sm text-gray-500">
                    {coupon.name}
                  </td>
                  <td className="px-2 py-1 whitespace-nowrap text-sm text-gray-500">
                    {coupon.value}
                  </td>
                  <td className="px-2 py-1 whitespace-nowrap text-sm text-gray-500">
                    <button onClick={() => handleDelte(coupon._id)}>
                      <svg
                        width="16"
                        height="16"
                        fill="#3321c8"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 4H9.5L8.5 3h-3L4.5 4H2v2h10V4zm-1 3H3v9c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V7zm-2 9H7v-6h2v6zm-3 0H4v-6h2v6z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {open && (
            <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[200000] flex items-center justify-center">
              <div className="w-[90%] 800px:w-[65%] h-auto bg-white rounded-md shadow p-4">
                <div className="w-full flex justify-end">
                  <RxCross1
                    size={30}
                    color="#3321c8"
                    className="cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>
                <h5 className="text-[30px] font-Poppins text-center">
                  Create Coupon Code
                </h5>
                <form
                  ref={formInput}
                  onSubmit={handleSubmit}
                  aria-required={true}
                >
                  <br />
                  <div>
                    <label htmlFor="" className="pb-2">
                      Name<span className="text-[#3321c8]">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={name}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] boder border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your coupon code name..."
                    />
                  </div>
                  <br />
                  <div>
                    <label htmlFor="" className="pb-2">
                      Discount Percentage
                      <span className="text-[#3321c8]">*</span>
                    </label>
                    <input
                      type="number"
                      name="value"
                      value={value}
                      required
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Enter your coupon code value..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">Min Amount</label>
                    <input
                      type="number"
                      name="minAmount"
                      value={minAmount}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setMinAmount(e.target.value)}
                      placeholder="Enter your coupon code min amount..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">Max Amount</label>
                    <input
                      type="number"
                      name="maxAmount"
                      value={maxAmount}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setMaxAmount(e.target.value)}
                      placeholder="Enter your coupon code max amount..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">Selected Product</label>
                    <select
                      className="w-full mt-2 border h-[35px] rounded-[5px]"
                      name="selectedProduct"
                      value={selectedProducts}
                      onChange={(e) => setSelectedProducts(e.target.value)}
                    >
                      <option value="Choose your selected products">
                        Choose a selected product
                      </option>
                      {products &&
                        products.map((product) => (
                          <option value={product.name} key={product.name}>
                            {product.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">Valid Till</label>
                    <input
                      type="date"
                      name="expires_At"
                      min={getCurrentDate()}
                      value={endDate}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={handleDateChange}
                      placeholder="Enter your coupon code max amount..."
                    />
                  </div>
                  <br />
                  <div>
                    <input
                      type="submit"
                      value="Create"
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AllCoupons;
