import { useEffect, useState } from "react";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../redux/actions/product";
import Loader from "../../Layout/Loader";

const BestDeals = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.products);
  useEffect(() => {
    // Dispatch the action to fetch all products
    dispatch(getAllProducts());
  }, [dispatch]);

  // This effect runs whenever the products data changes
  useEffect(() => {
    // Check if products data is available and not empty
    if (products && products.length > 0) {
      // Sort the products based on total_sell
      const sortedProducts = [...products].sort(
        (a, b) => b.total_sell - a.total_sell
      );
      // Take the first eight products
      const firstEightProducts = sortedProducts.slice(0, 5);
      // Set the data state with the sorted products
      setData(firstEightProducts);
    }
  }, [products]);

  return (
    <>
      {/* Display loader while fetching data */}
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className={`${styles.section}`}>
            <div className={`${styles.heading}`}>
              <h1>Best Deals</h1>
            </div>
            <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-5 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]">
              {/* Render product cards */}
              {data.map((product, index) => (
                <ProductCard data={product} key={index} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BestDeals;
