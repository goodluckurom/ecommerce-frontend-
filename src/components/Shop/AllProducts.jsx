import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProductsShop } from "../../redux/actions/product";
import Loader from "../Layout/Loader";
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./AllProducts.css"; // Import custom styles
import { toast } from "react-toastify";

const AllProducts = () => {
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);
  const { products, isLoading, error, success } = useSelector(
    (state) => state.products
  ) || {
    products: [],
    isLoading: false,
    error: null,
  };

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    if (seller && seller._id) {
      dispatch(getAllProductsShop(seller._id));
    }
  }, [seller, dispatch]);

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));
    setTimeout(() => {
      dispatch(getAllProductsShop(seller._id));
    }, 300);
    if (success) {
      toast.success("Product deleted successfully");
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <table className="min-w-full divide-y divide-gray-200 overflow-x-scroll">
            <thead>
              <tr className="header-row">
                <th scope="col" className="header-cell">
                  S/N
                </th>
                <th scope="col" className="header-cell">
                  Product Id
                </th>
                <th scope="col" className="header-cell">
                  Name
                </th>
                <th scope="col" className="header-cell">
                  Price
                </th>
                <th scope="col" className="header-cell">
                  Stock
                </th>
                <th scope="col" className="header-cell">
                  Sold out
                </th>
                <th scope="col" className="header-cell">
                  Preview
                </th>
                <th scope="col" className="header-cell">
                  Delete
                </th>
              </tr>
            </thead>
            <TransitionGroup
              component="tbody"
              className="bg-white divide-y divide-gray-200"
            >
              {currentProducts.map((product, index) => (
                <CSSTransition
                  key={product._id}
                  timeout={300}
                  classNames="fade"
                >
                  <>
                    {error && (
                      <div className="flex items-center justify-center">
                        <h2>
                          Error loading products, refresh the page and try again
                        </h2>
                      </div>
                    )}
                    <tr className="product-row">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {product._id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        US$ {product.discountPrice}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.stock}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.sold_out}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Link to={`/product/${product.name}`}>
                          <button className="icon-button">
                            <AiOutlineEye size={20} />
                          </button>
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() => handleDeleteProduct(product._id)}
                          className="icon-button"
                        >
                          <AiOutlineDelete size={20} />
                        </button>
                      </td>
                    </tr>
                  </>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </table>
          <div className="pagination">
            {[
              ...Array(Math.ceil(products.length / productsPerPage)).keys(),
            ].map((number) => (
              <button
                key={number + 1}
                onClick={() => paginate(number + 1)}
                className={`page-button ${
                  currentPage === number + 1 ? "active" : ""
                } rounded-full`}
              >
                {number + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AllProducts;
