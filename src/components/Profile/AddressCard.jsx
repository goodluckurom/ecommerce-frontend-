/* eslint-disable react/prop-types */
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import "./addressCard.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserAddress } from "../../redux/actions/user";
import { toast } from "react-toastify";

const AddressCard = ({ user }) => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const { deleteAddressSuccessMessage, deleteAddressError } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const handleAddressClick = (address) => {
    setSelectedAddress(address);
  };

  const handleCloseDetails = () => {
    setSelectedAddress(null);
  };

  const handleDelete = (addressId) => {
    dispatch(deleteUserAddress(addressId));
    if (deleteAddressSuccessMessage) {
      toast.success(deleteAddressSuccessMessage);
    } else if (deleteAddressError) {
      toast.error(deleteAddressError);
    }
  };

  return (
    <div className="w-full px-5 min-h-screen">
      {user &&
        user.addresses.map((item, index) => (
          <div
            key={index}
            className="w-full bg-white h-min 800px:h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10 mb-5 cursor-pointer hover:bg-gray-100 transition duration-300"
            onClick={() => handleAddressClick(item)}
          >
            <div className="flex items-center">
              <h5 className="pl-5 font-[600]">{item.addressType}</h5>
            </div>
            <div className="pl-8 flex items-center flex-col">
              <h6 className="text-[14px] 800px:text-[unset]">
                {item.address1}
              </h6>
              <h5 className="text-[14px] 800px:text-[unset]">
                {item.address2}
              </h5>
            </div>
            <div className="pl-8 flex items-center">
              <h6 className="text-[12px] 800px:text-[unset]">
                {user && user.phoneNumber}
              </h6>
            </div>
            <div className="min-w-[10%] flex items-center justify-between pl-8">
              <AiOutlineDelete
                size={25}
                className="cursor-pointer text-[#3321c8] hover:text-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(item._id);
                }}
              />
            </div>
          </div>
        ))}
      {selectedAddress && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleCloseDetails}
        >
          <div
            className="bg-white rounded-lg shadow-xl w-full max-w-lg p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end mb-4">
              <RxCross1
                className="cursor-pointer text-2xl hover:text-red-500 text-[#3a24db]"
                onClick={handleCloseDetails}
              />
            </div>
            <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
              Address Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p className="text-gray-700">
                <strong className="font-medium text-gray-900">Country:</strong>{" "}
                {selectedAddress.country}
              </p>
              <p className="text-gray-700">
                <strong className="font-medium text-gray-900">State:</strong>{" "}
                {selectedAddress.state}
              </p>
              <p className="text-gray-700">
                <strong className="font-medium text-gray-900">City:</strong>{" "}
                {selectedAddress.city}
              </p>
              <p className="text-gray-700">
                <strong className="font-medium text-gray-900">
                  Address 1:
                </strong>{" "}
                {selectedAddress.address1}
              </p>
              <p className="text-gray-700">
                <strong className="font-medium text-gray-900">
                  Address 2:
                </strong>{" "}
                {selectedAddress.address2}
              </p>
              <p className="text-gray-700">
                <strong className="font-medium text-gray-900">Zip Code:</strong>{" "}
                {selectedAddress.ZipCode}
              </p>
              <p className="text-gray-700">
                <strong className="font-medium text-gray-900">
                  Address Type:
                </strong>{" "}
                {selectedAddress.addressType}
              </p>
              <p className="text-gray-700">
                <strong className="font-medium text-gray-900">
                  Phone Number:
                </strong>{" "}
                {user && user.phoneNumber}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressCard;
