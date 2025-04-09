import Checkout from "../components/Checkout/Checkout";
import CheckoutSteps from "../components/Checkout/CheckoutSteps";
import Header from "../components/Layout/Header";

const CheckoutPage = () => {
  return (
    <div>
      <Header />
      <br />
      <br />
      <CheckoutSteps active={1} />
      <Checkout />
    </div>
  );
};

export default CheckoutPage;
