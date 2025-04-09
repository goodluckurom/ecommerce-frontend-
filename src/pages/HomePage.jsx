import BestDeals from "../components/Route/BestDeals/BestDeals";
import Events from "../components/Events/Events";
import FeaturedProducts from "../components/Route/FeaturedProducts/FeaturedProducts";
import Header from "../components/Layout/Header";
import Categories from "../components/Route/Categories/Categories";
import Hero from "../components/Route/Hero/Hero";
import Sponsored from "../components/Route/Sponsored/Sponsored";
import Footer from "../components/Route/Footer/Footer";
import styles from "../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { syncCart } from "../redux/actions/cart";
import { syncwishlist } from "../redux/actions/wishlist";
import { useEffect } from "react";

const HomePage = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const { events } = useSelector((state) => state.events);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(syncCart(isAuthenticated));
    dispatch(syncwishlist(isAuthenticated));
  }, [dispatch, isAuthenticated]);

  return (
    <div className={`${styles.section} w-[100%]`}>
      <Header activeHeading={1} />
      <Hero />
      <Categories />
      <BestDeals />
      {events && events.length > 0 && <Events events={events} />}{" "}
      <FeaturedProducts />
      <Sponsored />
      <Footer />
    </div>
  );
};

export default HomePage;
