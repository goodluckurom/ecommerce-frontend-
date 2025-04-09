import { useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import { loadSeller } from "../../redux/actions/seller";
import { toast } from "react-toastify";
import axios from "axios";
import { imageUrl, server } from "../../server";
import ScaleLoader from "react-spinners/ScaleLoader";

const ShopSettings = () => {
  const { seller } = useSelector((state) => state.seller);
  const [name, setName] = useState(seller && seller.shop_name);
  const [description, setDescription] = useState(
    seller && seller.shop_description ? seller.shop_description : ""
  );
  const [address, setAddress] = useState(seller && seller.address);
  const [phoneNumber, setPhoneNumber] = useState(seller && seller.phoneNumber);
  const [zipCode, setZipcode] = useState(seller && seller.zipCode);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await axios.put(
        `${server}/shop/update-shop-profile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      dispatch(loadSeller());
      toast.success(response.data.message);
      window.location.reload(true);
    } catch (error) {
      toast.error(error.response.data.message || "Failed to update avatar");
      console.error(error);
    }
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .put(
        `${server}/shop/update-seller-info`,
        {
          name,
          address,
          zipCode,
          phoneNumber,
          description,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setLoading(false);
        toast.success(res.data.message);
        dispatch(loadSeller());
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <div className="flex w-full 800px:w-[80%] flex-col justify-center my-5 bg-white p-6 rounded-lg shadow-lg">
        <div className="w-full flex items-center justify-center mb-6">
          <div className="relative">
            <img
              src={`${imageUrl}${seller.avatar?.public_id}`}
              alt="Shop Avatar"
              className="w-[200px] h-[200px] rounded-full cursor-pointer object-cover border-4 border-[#3321c8]"
            />
            <div className="w-[40px] h-[40px] bg-[#3321c8] rounded-full flex items-center justify-center cursor-pointer absolute bottom-2 right-2">
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={handleImage}
              />
              <label htmlFor="image" className="text-white">
                <AiOutlineCamera size={20} />
              </label>
            </div>
          </div>
        </div>

        {/* Shop information */}
        <form
          aria-required={true}
          className="flex flex-col items-center w-full"
          onSubmit={updateHandler}
        >
          <div className="flex flex-col 800px:flex-row w-full">
            <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5 px-2">
              <label className="block pb-2 text-lg font-medium text-gray-700">
                Shop Name
              </label>
              <input
                type="text"
                placeholder="Enter shop name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`${styles.input} !w-full mb-4 p-2 800px:mb-0`}
                required
              />
            </div>

            <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5 px-2">
              <label className="block pb-2 text-lg font-medium text-gray-700">
                Shop Address
              </label>
              <input
                type="text"
                placeholder="Enter shop address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={`${styles.input} !w-full mb-4 p-2 800px:mb-0`}
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="w-full flex items-center flex-col mt-5 px-2">
            <label className="block pb-2 text-lg font-medium text-gray-700">
              Shop Description
            </label>
            <textarea
              placeholder="Enter shop description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`${styles.input} !w-full mb-4 800px:mb-0 h-[100px]`}
            />
          </div>

          {/* Phone number and zip code */}
          <div className="flex flex-col 800px:flex-row w-full">
            <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5 px-2">
              <label className="block pb-2 text-lg font-medium text-gray-700">
                Shop Phone Number
              </label>
              <input
                type="tel"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className={`${styles.input} !w-full mb-4 p-2 800px:mb-0`}
                required
              />
            </div>

            <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5 px-2">
              <label className="block pb-2 text-lg font-medium text-gray-700">
                Shop Zip Code
              </label>
              <input
                type="text"
                placeholder="Enter zip code"
                value={zipCode}
                onChange={(e) => setZipcode(e.target.value)}
                className={`${styles.input} !w-full mb-4  p-2 800px:mb-0`}
                required
              />
            </div>
          </div>

          {/* Password and submit */}
          <div className="flex flex-col 800px:flex-row w-full">
            <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5 px-2">
              <label className="block pb-2 text-lg font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password to update"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${styles.input} !w-full mb-4 p-2 800px:mb-0`}
                required
              />
            </div>

            <div className="w-[100%] flex items-center flex-col 800px:w-[50%]  px-2">
              <button
                disabled={loading}
                type="submit"
                className="bg-[#3321c8] text-white py-2 px-4 rounded-[5px] cursor-pointer mt-5 w-full 800px:mt-14"
              >
                {loading ? (
                  <ScaleLoader height={10} color="#fff" />
                ) : (
                  "Update Shop"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShopSettings;
