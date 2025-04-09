import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  SignupPage,
  ActivationPage,
  HomePage,
  ProductsPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  ProductsDetailsPage,
  ProfilePage,
  CheckoutPage,
  PaymentPage,
  CreateShopPage,
  ShopLoginPage,
  ShopActivationPage,
  OrderSuccessPage,
  OrderDetailsPage,
  TrackOrderPage,
} from "./routes/Routes";
import {
  ShopHomePage,
  ShopDashboardPage,
  ShopAllOrders,
  ShopOrderDetails,
  ShopCreateProduct,
  ShopAllProducts,
  ShopCreateEvent,
  ShopAllEvents,
  ShopAllCoupouns,
  ShopPreviewPage,
  ShopAllRefunds,
  ShopWithDrawMoneyPage,
  ShopSettingsPage,
  ShopInboxPage,
} from "./shopRoutes/ShopRoutes";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { useEffect } from "react";
import store from "./redux/store";
import { loadUser } from "./redux/actions/user";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useSelector } from "react-redux";
import { loadSeller } from "./redux/actions/seller";
import SellerProtectedRoute from "./routes/SellerProtectedRoute";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { server } from "./server";

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  //load user and seller on load
  useEffect(() => {
    store.dispatch(loadUser()).catch((error) => {
      console.error("Error loading user:", error);
    });
    store.dispatch(loadSeller()).catch((error) => {
      toast.error(error);
    });
  }, []);

  const refreshShopToken = async () => {
    const response = await axios.post(
      `${server}/shop/refresh-token`,
      {},
      { withCredentials: true }
    );
    return response.data;
  };
  //function to refresh user token
  const refreshUserToken = async () => {
    const response = await axios.post(
      `${server}/user/refresh-token`,
      {},
      { withCredentials: true }
    );
    return response.data;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      refreshShopToken().catch((err) => console.error(err.message));
      refreshUserToken().catch((err) => console.error(err.message));
    }, 20 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <BrowserRouter>
      <div className="w-full h-screen">
        {/* order and payment routes */}
        <Routes>
          <Route
            path="/payment"
            element={
              // <ProtectedRoute isAuthenticated={isAuthenticated}>
              <PaymentPage />
              // </ProtectedRoute>
            }
          />
        </Routes>
        <Routes>
          {/* Home routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
          <Route
            path="/activation/:activation_token"
            element={<ActivationPage />}
          />
          <Route
            path="/shop-activation/:activation_token"
            element={<ShopActivationPage />}
          />
          {/* Product routes */}
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:name" element={<ProductsDetailsPage />} />
          <Route path="/best-selling" element={<BestSellingPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          {/* user routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order/success"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <OrderSuccessPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="user/order/:id"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <OrderDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/track/order/:id"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <TrackOrderPage />
              </ProtectedRoute>
            }
          />
          <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
          {/**  shop routes */}
          <Route path="/shop-create" element={<CreateShopPage />} />
          <Route path="/shop-login" element={<ShopLoginPage />} />
          <Route
            path="/shop/:id"
            element={
              <SellerProtectedRoute>
                <ShopHomePage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <SellerProtectedRoute>
                <ShopDashboardPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-orders"
            element={
              <SellerProtectedRoute>
                <ShopAllOrders />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-order/:id"
            element={
              <SellerProtectedRoute>
                <ShopOrderDetails />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-create-product"
            element={
              <SellerProtectedRoute>
                <ShopCreateProduct />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-products"
            element={
              <SellerProtectedRoute>
                <ShopAllProducts />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-create-event"
            element={
              <SellerProtectedRoute>
                <ShopCreateEvent />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-events"
            element={
              <SellerProtectedRoute>
                <ShopAllEvents />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-coupouns"
            element={
              <SellerProtectedRoute>
                <ShopAllCoupouns />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-refunds"
            element={
              <SellerProtectedRoute>
                <ShopAllRefunds />
              </SellerProtectedRoute>
            }
          />{" "}
          <Route
            path="/dashboard-withdraw-money"
            element={
              <SellerProtectedRoute>
                <ShopWithDrawMoneyPage />
              </SellerProtectedRoute>
            }
          />{" "}
          <Route
            path="/dashboard-messages"
            element={
              <SellerProtectedRoute>
                <ShopInboxPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-settings"
            element={
              <SellerProtectedRoute>
                <ShopSettingsPage />
              </SellerProtectedRoute>
            }
          />{" "}
        </Routes>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </BrowserRouter>
  );
};

export default App;
