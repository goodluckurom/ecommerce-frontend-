import { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import styles from "../styles/styles";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import Footer from "../components/Route/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/actions/product";
import Loader from "../components/Layout/Loader";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const categoryData = searchParams.get("category");
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    let filteredProducts = products;
    if (categoryData !== null) {
      filteredProducts = products.filter(
        (product) => product.category === categoryData
      );
    }
    const sortedProducts = filteredProducts
      .slice()
      .sort((a, b) => a.total_sell - b.total_sell);
    setData(sortedProducts);
    window.scrollTo(0, 0);
  }, [products, categoryData]);

  return (
    <>
      <Header activeHeading={3} />
      <br />
      <br />
      <div className={`${styles.section} mb-5`}>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-5 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]">
            {data.map((product, index) => (
              <ProductCard data={product} key={index} />
            ))}
          </div>
        )}
        {data.length === 0 && (
          <h2 className="text-center w-full pb-[100px] text-[20px] font-[600]">
            No products found in this category
          </h2>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProductsPage;
