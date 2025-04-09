import { useEffect, useState } from "react";
import { PaystackButton } from "react-paystack";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { server } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../redux/actions/order";
import { clearCart } from "../../redux/actions/cart";

const Payment = () => {
  const navigate = useNavigate();
  const latestOrder = JSON.parse(localStorage.getItem("latestOrder"));

  const publicKey = "pk_test_ca84c68ec102bd054c8776a90fcfee779e1e9911";
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(0);

  const [reference] = useState(`ref-${Date.now()}`);
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const latestOrder = JSON.parse(localStorage.getItem("latestOrder"));
    if (latestOrder) {
      setEmail(latestOrder.user.email);
      setAmount(parseFloat(latestOrder.totalPrice) * 100);
    }
  }, []);

  const onSuccess = async (response) => {
    try {
      const result = await axios.get(
        `${server}/payment/payment-verification/${response.reference}`,
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      if (result.data.success) {
        toast.success("Payment successful!");
        const latestOrder = JSON.parse(localStorage.getItem("latestOrder"));
        const orderData = {
          cart: latestOrder.cart,
          shippingAddress: latestOrder.shippingAddress,
          user: latestOrder.user,
          totalPrice: latestOrder.totalPrice,
          paymentInfo: {
            id: response.reference,
            status: response.status,
            type: "paystack",
          },
        };
        // Create order on payment success
        dispatch(createOrder(orderData));

        // Clear cart in frontend and backend
        localStorage.removeItem("cartItems");
        dispatch(clearCart(isAuthenticated));
        localStorage.removeItem("latestOrder");
        //navigate to the order success page
        navigate("/order/success");
      } else {
        toast.error("Payment verification failed!");
      }
    } catch (error) {
      console.error("Payment verification failed:", error.message);
      toast.error("Payment verification failed!");
    }
  };

  const onClose = () => {
    toast.error("Payment closed");
  };

  const componentProps = {
    email,
    amount,
    metadata: {
      custom_fields: [
        {
          display_name: "Full Name",
          variable_name: "full_name",
          value: latestOrder.user.name,
        },
        {
          display_name: "Phone Number",
          variable_name: "phone_number",
          value: latestOrder.user.phoneNumber,
        },
        {
          display_name: "Address Line 1",
          variable_name: "address_line_1",
          value: latestOrder.shippingAddress.address1,
        },
        {
          display_name: "Address Line 2",
          variable_name: "address_line_2",
          value: latestOrder.shippingAddress.address2,
        },
        {
          display_name: "City",
          variable_name: "city",
          value: latestOrder.shippingAddress.city,
        },
        {
          display_name: "State",
          variable_name: "state",
          value: latestOrder.shippingAddress.state,
        },
        {
          display_name: "Country",
          variable_name: "country",
          value: latestOrder.shippingAddress.country,
        },
        {
          display_name: "Zip Code",
          variable_name: "zip_code",
          value: latestOrder.shippingAddress.zipCode,
        },
      ],
    },
    publicKey,
    text: "Pay Now",
    onSuccess: (response) => onSuccess(response),
    onClose: () => onClose(),
    reference,
  };

  return (
    <div className="w-[70vw] mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Order Summary</h2>
      <div className="w-full flex items-center justify-center">
        <div className="mb-4 w-[50%]">
          <h3 className="text-lg font-semibold">Shipping Information</h3>
          <p>
            <strong>Name:</strong> {latestOrder.user.name}
          </p>
          <p>
            <strong>Email:</strong> {latestOrder.user.email}
          </p>
          <p>
            <strong>Phone:</strong> {latestOrder.user.phoneNumber}
          </p>
          <p>
            <strong>Address Line 1:</strong>{" "}
            {latestOrder.shippingAddress.address1}
          </p>
          <p>
            <strong>Address Line 2:</strong>{" "}
            {latestOrder.shippingAddress.address2}
          </p>
          <p>
            <strong>City:</strong> {latestOrder.shippingAddress.city}
          </p>
          <p>
            <strong>State:</strong> {latestOrder.shippingAddress.state}
          </p>
          <p>
            <strong>Country:</strong> {latestOrder.shippingAddress.country}
          </p>
          <p>
            <strong>Zip Code:</strong> {latestOrder.shippingAddress.zipCode}
          </p>
        </div>
        <div className="mb-4 w-[50%]">
          <h3 className="text-lg font-semibold">Order Details</h3>
          {latestOrder.cart.map((item, index) => (
            <div key={index} className="border-b border-gray-200 py-2">
              <p className="text-lg">{item.product.name}</p>
              <p>Quantity: {item.quantity}</p>
              {/* Add more details here */}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4 mt-2">
        <h3 className="text-lg font-semibold">Price Details</h3>
        <p>Subtotal: ${parseFloat(latestOrder.subTotalPrice).toFixed(2)}</p>
        <p>Discount: ${parseFloat(latestOrder.discountPrice).toFixed(2)}</p>
        <p>Shipping Cost: ${parseFloat(latestOrder.shipping).toFixed(2)}</p>
        <p>Total: ${parseFloat(latestOrder.totalPrice).toFixed(2)}</p>
      </div>
      <div className="flex justify-center mt-6">
        <PaystackButton
          {...componentProps}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
        />
      </div>
      {/* {isAuthenticated ? (
        <div className="flex justify-center mt-6">
          <h2 className="flex items-center text-red-500">
            PLEASE LOG IN TO CONTINUE
          </h2>
        </div>
      ) : (
        <div className="flex justify-center mt-6">
          <PaystackButton
            {...componentProps}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
          />
        </div>
      )} */}
    </div>
  );
};

export default Payment;
