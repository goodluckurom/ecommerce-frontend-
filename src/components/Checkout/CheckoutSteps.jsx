/* eslint-disable react/prop-types */
import styles from "../../styles/styles";

const CheckoutSteps = ({ active }) => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[90%] 800px:w-[50%] flex items-center flex-wrap sm:flex sm:items-center">
        <div className={`${styles.noramlFlex}`}>
          <div className={`${styles.cart_button}`}>
            <span className={`${styles.cart_button_text}`}>1.Shipping</span>
          </div>
          <div
            className={`${
              active > 1
                ? "w-[30px] 800px:w-[70px] h-[4px] !bg-[#3321c8]"
                : "w-[30px] 800px:w-[70px] h-[4px] !bg-[#d4d0f4]"
            }`}
          ></div>
          <div className={`${styles.noramlFlex}`}>
            <div
              className={`${
                active > 1
                  ? `${styles.cart_button}`
                  : `${styles.cart_button} !bg-[#d4d0f4]`
              }`}
            >
              <span
                className={`${
                  active > 1
                    ? `${styles.cart_button_text}`
                    : `${styles.cart_button_text} !text-[#3321c8]`
                }`}
              >
                2.Payment
              </span>
            </div>
          </div>
          <div className={`${styles.noramlFlex}`}>
            <div
              className={`${
                active > 3
                  ? "w-[30px] 800px:w-[70px] h-[4px] !bg-[#3321c8]"
                  : "w-[30px] 800px:w-[70px] h-[4px] !bg-[#d4d0f4]"
              }`}
            />
            <div
              className={`${
                active > 2
                  ? `${styles.cart_button}`
                  : `${styles.cart_button} !bg-[#d4d0f4]`
              }`}
            >
              <span
                className={`${
                  active > 2
                    ? `${styles.cart_button_text}`
                    : `${styles.cart_button_text} !text-[#3321c8]`
                }`}
              >
                3.Success
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSteps;
