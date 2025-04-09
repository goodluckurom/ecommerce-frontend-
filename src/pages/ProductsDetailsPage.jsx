import { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Route/Footer/Footer";
import ProductDetails from "../components/products/ProductDetails";
import { useParams, useSearchParams } from "react-router-dom";
import SuggestedProducts from "../components/products/SuggestedProducts";
import { server } from "../server";
import axios from "axios";
import { toast } from "react-toastify";

const ProductsDetailsPage = () => {
  const { name } = useParams(); // gets the name of the product from the search params
  const [data, setData] = useState(null);
  const productName = name.replace(/-/g, " "); // removes every - in the name in order to use it to find the product in the database
  const [similarProducts, setSimilarProducts] = useState(null);
  const [searchParams] = useSearchParams();
  const isEvent = searchParams.get("isEvent");

  useEffect(() => {
    const fetchProductByName = async (productName) => {
      try {
        window.scroll(0, 0);

        let productUrl = `${server}/product/get-product-by-name/${productName}`;
        if (isEvent) {
          productUrl = `${server}/event/get-event-by-name/${productName}`;
        }

        const { data } = await axios.get(productUrl);
        if (data.success) {
          setData(data.product || data.event);

          // Fetch suggested products by tags of the current product or event
          const tags = (data.product || data.event).tags.join(",");
          const suggestedProductsUrl = `${server}/product/get-products-by-tags?tags=${tags}`;
          const { data: relatedProducts } = await axios.get(
            suggestedProductsUrl
          );
          setSimilarProducts(relatedProducts.products);
        } else {
          throw new Error("Product not found or request failed.");
        }
      } catch (error) {
        console.error("Error fetching product or suggested products:", error);
        toast.error("Error fetching product data!!..");
      }
    };

    fetchProductByName(productName);
  }, [productName, isEvent]);

  return (
    <div>
      <Header />
      <ProductDetails data={data} />
      {similarProducts && <SuggestedProducts data={similarProducts} />}

      <br />
      <br />
      <Footer />
    </div>
  );
};

export default ProductsDetailsPage;
