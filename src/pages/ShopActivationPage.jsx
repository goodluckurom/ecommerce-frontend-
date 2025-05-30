import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { server } from "../server";

const ActivationPage = () => {
  const { activation_token } = useParams(); //comes from the link in the headers generated by jwt
  const [error, setError] = useState(false);
  const [redirectTime, setRedirectTime] = useState(10); // Countdown time in seconds
  const navigate = useNavigate();

  useEffect(() => {
    const activationEmail = async () => {
      if (activation_token) {
        try {
          const res = await axios.post(`${server}/shop/shop-activation`, {
            activation_token,
          });
          // Redirect to sign-in page after successful activation
          setTimeout(() => {
            navigate("/shop-login");
          }, 10000); // Redirect after 5 seconds
        } catch (err) {
          console.log(err.response.data.message);
          setError(true);
        }
      }
    };

    activationEmail();
  }, [activation_token, navigate]);

  // Countdown timer function
  useEffect(() => {
    if (redirectTime > 0) {
      const timer = setTimeout(() => {
        setRedirectTime((prevTime) => prevTime - 1);
      }, 1000); // Decrease timer every second
      return () => clearTimeout(timer);
    }
  }, [redirectTime]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        {error ? (
          <>
            <p className="text-red-500 text-xl font-semibold mb-4">
              Your token has expired! 😖
            </p>
            <p className="text-lg mb-2">
              If you already have an account click the link to sign in...
              <Link
                to="/shop-login"
                className="text-blue-500 hover:underline focus:outline-none focus:underline"
              >
                here
              </Link>
            </p>
          </>
        ) : (
          <>
            <p className="text-green-500 text-2xl font-semibold mb-4">
              Your shop has been created successfully! ✅
            </p>
            <p className="text-lg mb-2">
              Redirecting to sign-in page in {redirectTime} seconds...
            </p>
            <p className="text-lg mb-2">
              If you are not redirected automatically, click
              <Link
                to="/shop-login"
                className="text-blue-500 hover:underline focus:outline-none focus:underline"
              >
                here
              </Link>
              to sign in.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ActivationPage;
