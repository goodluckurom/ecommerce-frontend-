import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent, getAllShopEvents } from "../../redux/actions/event";
import { AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Loader from "../Layout/Loader";
import { toast } from "react-toastify";

const AllEvents = () => {
  const { seller } = useSelector((state) => state.seller);
  const { events, isLoading, success } = useSelector((state) => state.events);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (seller && seller._id) {
      dispatch(getAllShopEvents(seller._id));
    }
  }, [seller, dispatch]);

  console.log(events);
  const handleDelete = (id) => {
    dispatch(deleteEvent(id));
    if (success) {
      toast.success("Event deleted successfully");
      setTimeout(() => {
        window.location.reload(true);
      }, 3000);
    }
  };

  const totalPages = Math.ceil(events?.length / itemsPerPage);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEvents = events?.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white min-h-[calc(10*50px)]">
          {" "}
          {/* Adjust min-height to desired value */}
          <table className="table-auto w-full shadow-sm">
            <thead>
              <tr className="bg-[#3957db]  text-white">
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Product Id</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Stock</th>
                <th className="px-4 py-2">Sold out</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2"></th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {currentEvents &&
                currentEvents.map((item, index) => (
                  <tr key={item._id} className="hover:bg-[#f1f1f1] px-6 py-4">
                    <td className="border px-4 py-2">
                      {startIndex + index + 1}
                    </td>
                    <td className="border px-4 py-2">{item._id}</td>
                    <td className="border px-4 py-2">
                      {item.name.length > 35
                        ? item.name.slice(0, 35) + "..."
                        : item.name}
                    </td>
                    <td className="border px-4 py-2">
                      US$ {item.discountPrice}
                    </td>
                    <td className="border px-4 py-2">{item.stock}</td>
                    <td className="border px-4 py-2">{item.sold_out}</td>
                    <td
                      className={`border px-4 py-2 ${
                        item.status === "running"
                          ? "bg-yellow-100"
                          : item.status === "finished"
                          ? "bg-red-100"
                          : "bg-green-100"
                      }`}
                    >
                      {item.status}
                    </td>
                    <td className="border px-4 py-2">
                      <Link
                        to={`/product/${item.name.replace(
                          /\s+/g,
                          "-"
                        )}?isEvent=true`}
                      >
                        <button className="hover:text-blue-500 transition-colors duration-300">
                          <AiOutlineEye size={20} />
                        </button>
                      </Link>
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="hover:text-red-500 transition-colors duration-300"
                      >
                        <AiOutlineDelete size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageClick(index + 1)}
                className={`px-4 py-2 mx-1  rounded-full ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white rounded"
                    : "bg-gray-200 text-black"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AllEvents;
