/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styles from "../../styles/styles";

const CartData = ({
  handleSubmit,
  totalPrice,
  shipping,
  subTotalPrice,
  couponCode,
  setCouponCode,
  discountPercentage,
  discountPrice,
  discountDetails,
}) => {
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Subtotal:</h3>
        <h5 className="text-[18px] font-[600]">${subTotalPrice}</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Shipping:</h3>
        <h5 className="text-[18px] font-[600]">${shipping.toFixed(2)}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]">
          -{discountPercentage ? "$" + discountPercentage.toString() : null}
        </h5>
      </div>
      <br />
      {discountDetails.length > 0 && (
        <div className="pb-3 border-b">
          <h3 className="text-[16px] font-[400] text-[#000000a4] mb-2">
            Discount Details:
          </h3>
          {discountDetails.map((item, index) => (
            <div key={index} className="flex justify-between">
              <h5 className="text-[14px] font-[400]">{item.product.name}</h5>
              <h5 className="text-[14px] font-[400]">
                -${item.discount.toFixed(2)}
              </h5>
            </div>
          ))}
        </div>
      )}
      <h5 className="text-[18px] font-[600] text-end pt-3">${totalPrice}</h5>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className={`${styles.input} h-[40px] pl-2`}
          placeholder="Coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          required
        />
        <button
          type="submit"
          className="text-[18px] cursor-pointer inline-block border-[1px] p-2 rounded border-[#3957db] mt-4 w-full"
        >
          Apply code
        </button>
      </form>
    </div>
  );
};

export default CartData;
