import { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import styles from "../styles/styles";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import Footer from "../components/Route/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/actions/product";
import Loader from "../components/Layout/Loader";

const BestSellingPage = () => {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const categoryData = searchParams.get("category");
  const { products, isLoading } = useSelector((state) => state.products);

  // Fetch all products once the component mounts
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // Filter and sort products whenever products or categoryData changes
  useEffect(() => {
    let filteredProducts = products;

    // Filter by category if categoryData is not null
    if (categoryData !== null) {
      filteredProducts = products.filter(
        (product) => product.category === categoryData
      );
    }

    // Sort the filtered products by total_sell in descending order
    const sortedProducts = filteredProducts
      .slice()
      .sort((a, b) => b.total_sell - a.total_sell);

    setData(sortedProducts);
  }, [products, categoryData]);

  return (
    <>
      <Header activeHeading={2} />
      <br />
      <br />
      <div className={`${styles.section} mb-5`}>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-5 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]">
            {data.map((i, index) => (
              <ProductCard data={i} key={index} />
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

export default BestSellingPage;
