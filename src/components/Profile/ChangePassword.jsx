import { useState } from "react";
import styles from "../../styles/styles";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import ScaleLoader from "react-spinners/ScaleLoader";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setIsloading] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      setIsloading(true);
      const { data } = await axios.put(
        `${server}/user/update-user-password`,
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true }
      );
      //form reset
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");

      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsloading(false);
    }
  };
  return (
    <div className="w-full px-5 py-10 flex flex-col items-center">
      <h1 className="text-3xl font-semibold text-gray-800 pb-5">
        Change Password
      </h1>
      <div className="w-full max-w-md">
        <form
          className="flex flex-col items-center"
          aria-required
          onSubmit={handlePasswordChange}
        >
          <div className="w-full mt-2">
            <label htmlFor="old-password" className="block pb-2 text-gray-700">
              Enter Your Old Password
            </label>
            <input
              id="old-password"
              type="password"
              className={`${styles.input} w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="w-full mt-2">
            <label htmlFor="new-password" className="block pb-2 text-gray-700">
              Enter Your New Password
            </label>
            <input
              id="new-password"
              type="password"
              className={`${styles.input} w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="w-full mt-2">
            <label
              htmlFor="confirm-password"
              className="block pb-2 text-gray-700"
            >
              Confirm Your New Password
            </label>
            <input
              id="confirm-password"
              type="password"
              className={`${styles.input} w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="w-full mt-5 ">
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              {loading ? <ScaleLoader color="#fff" /> : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
