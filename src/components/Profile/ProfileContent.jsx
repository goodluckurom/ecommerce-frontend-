import { useDispatch, useSelector } from "react-redux";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/styles";
import { useState } from "react";
import AllOrders from "./AllOrders";
import AllRefundOrders from "./AllRefundOrders";
import TrackOrder from "./TrackOrder";
import PaymentMethods from "./PaymentMethods";
import Address from "./Address";
import { loadUser, updateUserDetails } from "../../redux/actions/user";
import { toast } from "react-toastify";
import ScaleLoader from "react-spinners/ScaleLoader";
import axios from "axios";
import { imageUrl, server } from "../../server";
import ChangePassword from "./ChangePassword";
import { RxCross1 } from "react-icons/rx";

/* eslint-disable react/prop-types */
const ProfileContent = ({ active }) => {
  const { user, loading, UpdatedSuccess, error } = useSelector(
    (state) => state.user
  );
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(
    (user && user.phoneNumber) || null
  );
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  //submit function for update
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserDetails(name, email, phoneNumber, password));
    if (UpdatedSuccess) {
      toast.success("user details updated successfuly");
      window.location.reload();
      setPassword("");
    }
    if (error) {
      toast.error(error);
      setPassword("");
    }
  };

  //function to update the user avatar
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await axios.put(
        `${server}/user/update-profile-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      dispatch(loadUser());
      toast.success(response.data.message);
      window.location.reload(true);
    } catch (error) {
      toast.error(error.response.data.message || "Failed to update avatar");
      console.error(error);
    }
  };

  return (
    <div className="w-full">
      {/**Profile */}
      {active === 1 && (
        <>
          {open && (
            <div
              className="fixed top-0 left-0 w-full h-screen bg-black/40 flex items-center justify-center z-50"
              onClick={() => setOpen(!open)}
            >
              <div
                className="sm:w-[70%] md:w-[40%] h-[90vh] bg-white rounded-lg shadow-lg relative z-50"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={`${imageUrl}${user?.avatar.public_id}`}
                  alt=""
                  className="w-full h-full object-cover rounded-md"
                  onClick={() => setOpen(!open)}
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 p-2 rounded-full bg-white hover:bg-gray-100 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-gray-400"
                  onClick={() => setOpen(!open)}
                >
                  <RxCross1 className="text-[#3321c8] hover:text-red-500 w-6 h-6" />
                </button>
              </div>
            </div>
          )}

          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={`${imageUrl}${user?.avatar.public_id}`}
                alt=""
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                onClick={() => setOpen(!open)}
              />
              <div className=" w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px] shadow-sm  border-[1px] border-[#3ad132]">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <label htmlFor="image">
                  <AiOutlineCamera
                    title="Update Avatar"
                    size={20}
                    color="#3a24db"
                    className="shadow-sm"
                  />
                </label>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="w-full px-5">
            <form action="" onSubmit={handleSubmit} aria-required={true}>
              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Full Name</label>
                  <input
                    type="text"
                    // className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    className={`${styles.input} w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className=" w-[100%] 800px:w-[50%] md:ml-2">
                  <label className="block pb-2">Email Address</label>
                  <input
                    type="text"
                    // className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                    className={`${styles.input} w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Phone Number</label>
                  <input
                    type="number"
                    // className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    className={`${styles.input} w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className=" w-[100%] 800px:w-[50%] md:ml-2">
                  <label className="block pb-2">Password </label>
                  <input
                    type="password"
                    // className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    className={`${styles.input} w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full 800px:flex block pb-3"></div>

              <button
                type="submit"
                required
                className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-2 cursor-pointer`}
              >
                {loading ? <ScaleLoader color="#3a24db" /> : "Update"}
              </button>
            </form>
          </div>
        </>
      )}
      {/** order  */}
      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}
      {/**Refund order  */}
      {active === 3 && (
        <div>
          <AllRefundOrders />
        </div>
      )}
      {/**Track order  */}
      {active === 5 && (
        <div>
          <TrackOrder />
        </div>
      )}
      {/* change password */}
      {active === 6 && (
        <div>
          <ChangePassword />
        </div>
      )}
      {/**Payment Methods */}
      {active === 9 && (
        <div>
          <PaymentMethods />
        </div>
      )}
      {active === 7 && (
        <div>
          <Address />
        </div>
      )}
    </div>
  );
};

export default ProfileContent;
