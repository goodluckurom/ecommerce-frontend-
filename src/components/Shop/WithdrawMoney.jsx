import { useSelector } from "react-redux";
import styles from "../../styles/styles";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import { AiOutlineDelete } from "react-icons/ai";
const WithdrawMoney = () => {
  const { seller } = useSelector((state) => state.seller);
  const [open, setOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(false);

  const availableBalance = seller && seller.availableBalance;

  return (
    <div className="w-full h-[90vh] p-8">
      <div className="w-full bg-white h-full rounded flex items-center justify-center flex-col">
        <h5 className="text-[20px] pb-4">
          Available Balance: ${availableBalance}
        </h5>
        <div
          onClick={() =>
            availableBalance < 1000
              ? toast.error("withdrawal threshold is $1000")
              : setOpen(!open)
          }
          className={`${styles.button} bg-[#3321c8] text-white h-[42px] rounded`}
        >
          Withdraw
        </div>
      </div>
      {open && (
        <div
          className="w-full h-screen z-[9999] fixed top-0 left-0 flex items-center justify-center bg-[#0000004e]"
          onClick={() => setOpen(!open)}
        >
          <div
            className={`w-[95%] 800px:w-[50%] bg-white shadow rounded ${
              paymentMethod ? "h-[80vh] overflow-y-scroll" : "h-[unset]"
            } min-h-[50vh] p-3`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex justify-end">
              <RxCross1
                size={30}
                color="#3321c8"
                onClick={() => setOpen(false) || setPaymentMethod(false)}
                className="cursor-pointer"
              />
            </div>
            {paymentMethod ? (
              <div>
                <h3 className="text-[22px] font-Poppins text-center font-[600]">
                  Add a new payment payment Method
                </h3>
                <form action="">
                  <div>
                    <label htmlFor="">
                      Bank Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name=""
                      //   value={}
                      //   onChange={}
                      required
                      placeholder="Enter your Bank name!"
                      className={`${styles.input} mt-2`}
                    />
                  </div>
                  <div className="pt-2">
                    <label>
                      Bank Country <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name=""
                      //   value={bankInfo.bankCountry}
                      //   onChange={(e) =>
                      //     setBankInfo({
                      //       ...bankInfo,
                      //       bankCountry: e.target.value,
                      //     })
                      //   }
                      id=""
                      required
                      placeholder="Enter your bank Country!"
                      className={`${styles.input} mt-2`}
                    />
                  </div>
                  {/*  swift code*/}
                  <div className="pt-2">
                    <label>
                      Bank Swift Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name=""
                      id=""
                      required
                      //   value={bankInfo.bankSwiftCode}
                      //   onChange={(e) =>
                      //     setBankInfo({
                      //       ...bankInfo,
                      //       bankSwiftCode: e.target.value,
                      //     })
                      //   }
                      placeholder="Enter your Bank Swift Code!"
                      className={`${styles.input} mt-2`}
                    />
                  </div>
                  {/* account name */}
                  <div className="pt-2">
                    <label>
                      Bank Account Number{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name=""
                      id=""
                      //   value={bankInfo.bankAccountNumber}
                      //   onChange={(e) =>
                      //     setBankInfo({
                      //       ...bankInfo,
                      //       bankAccountNumber: e.target.value,
                      //     })
                      //   }
                      required
                      placeholder="Enter your bank account number!"
                      className={`${styles.input} mt-2`}
                    />
                  </div>
                  {/* holder name  */}
                  <div className="pt-2">
                    <label>
                      Bank Holder Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name=""
                      required
                      //   value={bankInfo.bankHolderName}
                      //   onChange={(e) =>
                      //     setBankInfo({
                      //       ...bankInfo,
                      //       bankHolderName: e.target.value,
                      //     })
                      //   }
                      id=""
                      placeholder="Enter your bank Holder name!"
                      className={`${styles.input} mt-2`}
                    />
                  </div>
                  {/* bank address */}
                  <div className="pt-2">
                    <label>
                      Bank Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name=""
                      required
                      id=""
                      //   value={bankInfo.bankAddress}
                      //   onChange={(e) =>
                      //     setBankInfo({
                      //       ...bankInfo,
                      //       bankAddress: e.target.value,
                      //     })
                      //   }
                      placeholder="Enter your bank address!"
                      className={`${styles.input} mt-2`}
                    />
                  </div>
                  <button
                    type="submit"
                    className={`${styles.button} mb-3 text-white bg-[#3321c8]`}
                  >
                    Add
                  </button>
                </form>
              </div>
            ) : (
              <>
                <h3 className="text-[22px] font-Poppins">
                  Available withdrawal methods:
                </h3>

                {seller && seller?.withdrawMethod ? (
                  <div>
                    <div className="800px:flex w-full justify-between items-center">
                      <div className="800px:w-[60%]">
                        {" "}
                        <h5>
                          Account Number:{" "}
                          {"*".repeat(
                            seller?.withdrawMethod.bankAccountNumber.length - 3
                          ) +
                            seller?.withdrawMethod.bankAccountNumber.slice(-3)}
                        </h5>
                        <h5>Bank Name: {seller?.withdrawMethod.bankName}</h5>
                      </div>
                      <div className="800px:w-[50%]">
                        <AiOutlineDelete
                          size={25}
                          className="cursor-pointer"
                          //   onClick={() => deleteHandler()}
                        />
                      </div>
                    </div>
                    <br />
                    <h4>Available Balance: {availableBalance}$</h4>
                    <br />
                    <div className="800px:flex w-full items-center">
                      <input
                        type="number"
                        placeholder="Amount..."
                        // value={withdrawAmount}
                        // onChange={(e) => setWithdrawAmount(e.target.value)}
                        className="800px:w-[100px] w-[full] border 800px:mr-3 p-1 rounded"
                      />
                      <div
                        className={`${styles.button} !h-[42px] text-white bg-[#3321c8]`}
                        // onClick={withdrawHandler}
                      >
                        Withdraw
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-[18px] pt-2">
                      No Withdraw Methods available!
                    </p>
                    <div className="w-full flex items-center">
                      <div
                        className={`${styles.button} text-[#fff] text-[18px] mt-4 bg-[#3321c8]`}
                        onClick={() => setPaymentMethod(true)}
                      >
                        Add new
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WithdrawMoney;
