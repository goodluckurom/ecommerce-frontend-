/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "../../styles/styles";
// import { productData } from "../../static/data";
import ProductCard from "../Route/ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";
import { getAllShopEvents } from "../../redux/actions/event";
import EventCard from "../Events/EventCard";

const ShopProfileData = ({ isOwner }) => {
  const [active, setActive] = useState(1);
  const { products } = useSelector((state) => state.products);
  const { events } = useSelector((state) => state.events);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    dispatch(getAllShopEvents(id));
  }, [dispatch, id]);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <div className="w-full flex">
          <div className="flex items-center" onClick={() => setActive(1)}>
            <h5
              className={`font-[600] text-[20px] ${
                active === 1 ? "text-[#3321c8]" : "text-[#333]"
              } cursor-pointer pr-[20px] text-center`}
            >
              Shop Products
            </h5>
          </div>
          <div className="flex items-center" onClick={() => setActive(2)}>
            <h5
              className={`font-[600] text-[20px] ${
                active === 2 ? "text-[#3321c8]" : "text-[#333]"
              } cursor-pointer pr-[20px]`}
            >
              Running Events
            </h5>
          </div>
          <div className="flex items-center" onClick={() => setActive(3)}>
            <h5
              className={`font-[600] text-[20px] ${
                active === 3 ? "text-[#3321c8]" : "text-[#333]"
              } cursor-pointer pr-[20px]`}
            >
              Shop Reviews
            </h5>
          </div>
        </div>
        <div>
          {isOwner && (
            <div>
              <Link to="/dashboard">
                <div
                  className={`${styles.button} !rounded-[4px] h-[42px] bg-[#3321c8]`}
                >
                  <span className="text-[#fff]">Go Dashboard</span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>

      <br />
      {active === 1 && (
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
          {products &&
            products.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
      )}
      {/* {active === 2 && (
        <div className=" w-full grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
          {events &&
            events.map((i, index) => <EventCard data={i} key={index} />)}
        </div>
      )} */}
      <div className="w-full">
        {events &&
          events.map((event) => <EventCard key={event._id} data={event} />)}
      </div>
    </div>
  );
};

export default ShopProfileData;
