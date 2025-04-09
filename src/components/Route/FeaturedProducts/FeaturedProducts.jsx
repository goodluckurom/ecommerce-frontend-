import { useEffect } from "react";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";
import { useSelector } from "react-redux";
import Loader from "../../Layout/Loader";

useEffect;
const FeaturedProducts = () => {
  const { products, isLoading } = useSelector((state) => state.products);
  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Featured Products</h1>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-5 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]">
            {products &&
              products.map((i, index) => <ProductCard data={i} key={index} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedProducts;
