/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import styles from "../../styles/styles";
import ProductCard from "../Route/ProductCard/ProductCard";

const SuggestedProducts = ({ data }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    setRelatedProducts(data);
  }, [data]);

  return (
    <div>
      <div className={`${styles.section} p-4`}>
        <h2
          className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}
        >
          Related Products
        </h2>
        <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-5 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]">
          {relatedProducts &&
            relatedProducts.map((i, index) => (
              <ProductCard data={i} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};
export default SuggestedProducts;
