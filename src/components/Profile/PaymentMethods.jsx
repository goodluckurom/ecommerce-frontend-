import { AiOutlineDelete } from "react-icons/ai";
import styles from "../../styles/styles";

const PaymentMethods = () => {
  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          Payment Methods
        </h1>
        <div
          className={`${styles.button} !rounded-md bg-[#3957db] !hover:bg-[##3977ef]`}
        >
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />
      <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
        <div className="flex items-center">
          <img
            src="/visamaster.png"
            alt=""
            style={{
              height: "25px",
            }}
          />
          <h5 className="pl-5 font-[600] text-[18px]">Urom Goodluck Uche</h5>
        </div>
        <div className="flex items-center pl-8 text-[18px]">
          <h6> 1234 *** **** ****</h6>
          <h6 className="pl-5 flex items-center">6**</h6>
          <h6 className="pl-5 flex items-center">09/26</h6>
        </div>
        <div className="min-w-[10%] flex items-center justify-between pl-8">
          <AiOutlineDelete
            size={25}
            className="cursor-pointer"
            color="#3957db"
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
