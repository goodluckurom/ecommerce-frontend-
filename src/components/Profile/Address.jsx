import styles from "../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import { MapIcon } from "@heroicons/react/24/solid";
import { useState, useEffect, useRef } from "react";
import { Country, State, City } from "country-state-city";
import { updateUserAddress } from "../../redux/actions/user";
import ScaleLoader from "react-spinners/ScaleLoader";
import { toast } from "react-toastify";
import AddressCard from "./AddressCard";

const Address = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");
  const [cities, setCities] = useState([]);
  const {
    user,
    updateAddressLoading,
    updateAddressSuccess,
    updateAddressError,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const formInput = useRef();

  const addressTypeData = [
    { name: "Default" },
    { name: "Home" },
    { name: "Office" },
  ];

  useEffect(() => {
    if (country && state) {
      const fetchedCities = City.getCitiesOfState(country, state);
      setCities(fetchedCities);
    }
  }, [country, state]);

  const handleAddAddress = (e) => {
    e.preventDefault();

    const formData = new FormData(formInput.current);
    const addressData = {};
    formData.forEach((value, key) => {
      addressData[key] = value;
    });
    dispatch(updateUserAddress(addressData));

    if (updateAddressError) {
      toast.error("Failed to add addres try again later!..");
    }
    //to reset the form inputs
    setCountry("");
    setState("");
    setCity("");
    setZipCode("");
    setAddress1("");
    setAddress2("");
    setAddressType("");

    if (updateAddressSuccess) {
      toast.success("Address added successfully");
      setOpen(!open);
      // window.location.reload(true);
    }
  };
  return (
    <div className="w-full px-5 min-h-screen">
      {open && (
        <div
          className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-[60%] h-[90vh] bg-white rounded-lg shadow-lg relative overflow-y-scroll z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex justify-end p-3">
              <RxCross1
                className="cursor-pointer text-[#3321c8] hover:text-red-500"
                onClick={() => setOpen(!open)}
              />
            </div>
            <h1 className="text-center text-2xl font-semibold text-[#3321c8] mb-4">
              Add A New Address
            </h1>
            <div className="w-full">
              <form
                aria-required
                className="w-full p-4"
                onSubmit={handleAddAddress}
                ref={formInput}
              >
                <div className="w-full space-y-4">
                  <div className="w-full">
                    <label className="block text-gray-700">Country</label>
                    <select
                      name="country"
                      id="country"
                      value={country}
                      onChange={(e) => {
                        setCountry(e.target.value);
                        setState("");
                        setCity("");
                        setCities([]);
                      }}
                      className={`w-full border h-10 rounded-md ${
                        !country ? "text-gray-400" : "text-black"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                      <option value="">Choose your Country</option>
                      {Country.getAllCountries().map((country) => (
                        <option key={country.isoCode} value={country.isoCode}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-full">
                    <label htmlFor="state" className="block text-gray-700">
                      Choose Your State
                    </label>
                    <select
                      name="state"
                      id="state"
                      value={state}
                      onChange={(e) => {
                        setState(e.target.value);
                        setCity("");
                      }}
                      className={`w-full border h-10 rounded-md ${
                        !state ? "text-gray-400" : "text-black"
                      }focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                      <option value="">Choose Your State</option>
                      {State.getStatesOfCountry(country).map((state) => (
                        <option key={state.isoCode} value={state.isoCode}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-full">
                    <label htmlFor="city" className="block text-gray-700">
                      Choose Your City
                    </label>
                    <select
                      name="city"
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className={`w-full border h-10 rounded-md ${
                        !city ? "text-gray-400" : "text-black"
                      }focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                      <option value="">Choose Your City</option>
                      {cities.map((city) => (
                        <option key={city.name} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-full">
                    <label htmlFor="address1" className="block text-gray-700">
                      Address 1
                    </label>
                    <input
                      type="text"
                      name="address1"
                      id="address1"
                      className={`${styles.input} w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      required
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                    />
                  </div>

                  <div className="w-full">
                    <label htmlFor="address2" className="block text-gray-700">
                      Address 2
                    </label>
                    <input
                      type="text"
                      name="address2"
                      id="address2"
                      required
                      className={`${styles.input} w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                  </div>

                  <div className="w-full">
                    <label htmlFor="zipCode" className="block text-gray-700">
                      Zip Code
                    </label>
                    <input
                      type="number"
                      name="zipCode"
                      id="zipCode"
                      className={`${styles.input} w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>

                  <div className="w-full">
                    <label
                      htmlFor="addressType"
                      className="block text-gray-700"
                    >
                      Address Type
                    </label>
                    <select
                      name="addressType"
                      id="addressType"
                      className={`w-full border h-10 rounded-md ${
                        !addressType ? "text-gray-400" : "text-black"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      onChange={(e) => setAddressType(e.target.value)}
                    >
                      <option value="">Choose Your Address Type</option>
                      {addressTypeData.map((addressType) => (
                        <option key={addressType.name} value={addressType.name}>
                          {addressType.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-full">
                    <button
                      className="w-full h-10 bg-[#3321c8] text-white rounded-md hover:bg-[#261a9a] transition duration-200"
                      type="submit"
                    >
                      {updateAddressLoading ? (
                        <ScaleLoader color="#ffffff" />
                      ) : (
                        "Add Address"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          My Addresses
        </h1>
        <div
          className={`${styles.button} !rounded-md bg-[#3321c8] hover:bg-[#4a39d4]`}
          onClick={() => setOpen(!open)}
        >
          <span className="text-[#fff]">Add Address</span>
        </div>
      </div>
      <br />
      {/* <div className="w-full px-5 min-h-screen flex items-center justify-center"> */}
      {user.addresses.length < 1 ? (
        <div className="flex flex-col items-center justify-center">
          <MapIcon className="w-24 h-24 text-blue-800 text-opacity-40 mb-4" />
          <h1 className="text-xl font-semibold text-gray-700">
            You have no saved address
          </h1>
          <button
            onClick={() => setOpen(!open)}
            className="mt-2 px-4 py-2 border border-[#3321c8] rounded-md bg-[#3321c8] text-white font-semibold hover:bg-[#4a39d4] focus:ring-2 focus:ring-[#3321c8] focus:ring-opacity-50 transition duration-200"
          >
            Add New
          </button>
        </div>
      ) : (
        <AddressCard user={user} />
      )}
      {/* </div> */}
    </div>
  );
};

export default Address;
