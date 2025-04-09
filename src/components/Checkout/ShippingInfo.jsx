/* eslint-disable react/prop-types */
import { City, Country, State } from "country-state-city";
import styles from "../../styles/styles";
import { useState } from "react";

const ShippingInfo = ({
  user,
  country,
  setCountry,
  state,
  setState,
  city,
  setCity,
  userInfo,
  setUserInfo,
  address1,
  setAddress1,
  address2,
  setAddress2,
  zipCode,
  setZipCode,
}) => {
  const [selectedAddressType, setSelectedAddressType] = useState("");
  const [fullName, setFullName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);

  //function to manage the values of the selected address type
  const handleCheckboxClick = (item) => {
    if (selectedAddressType === item.addressType) {
      setSelectedAddressType("");
      clearAddressFields();
    } else {
      setSelectedAddressType(item.addressType);
      setAddress1(item.address1);
      setAddress2(item.address2);
      setZipCode(item.zipCode);
      setCountry(item.country);
      setState(item.state);
      setCity(item.city);
    }
  };
  //
  const clearAddressFields = () => {
    setAddress1("");
    setAddress2("");
    setZipCode("");
    setCountry("");
    setState("");
    setCity("");
  };

  return (
    <div className=" w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">
      <h5 className=" text-[18px] font-[500] ">Shipping Address</h5>
      <br />
      <form>
        <div className="w-full flex pb-3">
          {/**name */}
          <div className="w-[50%]">
            <label className="block pb-2">Full Name</label>
            <input
              type="text"
              value={fullName}
              required
              onChange={(e) => setFullName(e.target.value)}
              className={`${styles.input} !w-[95%]  focus:outline-none focus:ring-2 focus:ring-[#3957db]`}
            />
          </div>
          {/**email */}
          <div className="w-[50%]">
            <label className="block pb-2">Email Address</label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className={`${styles.input} focus:outline-none focus:ring-2 focus:ring-[#3957db]`}
            />
          </div>
        </div>

        <div className="w-full flex pb-3">
          {/**phone number */}
          <div className="w-[50%]">
            <label className="block pb-2">Phone Number</label>
            <input
              type="number"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`${styles.input} !w-[95%] focus:outline-none focus:ring-2 focus:ring-[#3957db]`}
            />
          </div>
          {/**Zip code  */}
          <div className="w-[50%]">
            <label className="block pb-2">Zip Code</label>
            <input
              type="number"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
              className={`${styles.input} focus:outline-none focus:ring-2 focus:ring-[#3957db]`}
            />
          </div>
        </div>
        {/** */}
        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Country</label>
            <select
              className="w-[95%] border h-[40px] rounded-[5px] focus:outline-none focus:ring-2 focus:ring-[#3957db]"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option className="block pb-2" value="">
                Choose your country
              </option>
              {Country &&
                Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          {/*  */}
          <div className="w-[50%]">
            <label className="block pb-2">State</label>
            <select
              className="w-[95%] border h-[40px] rounded-[5px] focus:outline-none focus:ring-2 focus:ring-[#3957db]"
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <option className="block pb-2" value="">
                Choose your State
              </option>
              {State &&
                State.getStatesOfCountry(country).map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          {/*  */}
          <div className="w-[50%]">
            <label className="block pb-2">City</label>
            <select
              className="w-[95%] border h-[40px] rounded-[5px] focus:outline-none focus:ring-2 focus:ring-[#3957db]"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option className="block pb-2" value="">
                Choose your City
              </option>
              {City.getCitiesOfState(country, state).map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/** */}
        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Address1</label>
            <input
              type="address"
              required
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              className={`${styles.input} !w-[95%] focus:outline-none focus:ring-2 focus:ring-[#3957db]`}
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Address2</label>
            <input
              type="address"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              required
              className={`${styles.input} focus:outline-none focus:ring-2 focus:ring-[#3957db]`}
            />
          </div>
        </div>

        <div></div>
      </form>
      <h5
        className="text-[18px] cursor-pointer inline-block border-[1px] p-2 rounded border-[#3957db]"
        onClick={() => setUserInfo(!userInfo)}
      >
        Choose From saved address
      </h5>
      {userInfo && (
        <div>
          {user &&
            user.addresses.map((item, index) =>
              item.length === 0 ? (
                <h2 key={index} className="text-red-400">
                  You have no save address
                </h2>
              ) : (
                <>
                  <div className="w-full flex mt-1" key={index}>
                    <input
                      type="checkbox"
                      className="mr-3"
                      value={item.addressType}
                      checked={selectedAddressType === item.addressType}
                      onClick={() => handleCheckboxClick(item)}
                    />
                    <h2>{item.addressType}</h2>
                  </div>
                </>
              )
            )}
        </div>
      )}
    </div>
  );
};

export default ShippingInfo;
