/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { server } from "../../server";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft, AiOutlineSend } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";

const DashboardMessages = () => {
  const [chats, setChats] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const { seller } = useSelector((state) => state.seller);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchChats(sellerId) {
      const { data } = await axios
        .get(`${server}/chat/get-all-chats/${sellerId}`, {
          withCredentials: true,
        })
        .then((res) => {
          setChats(res.data.chats);
        })
        .catch((error) => console.log(error));

      console.log(data.chats);

      return data;
    }

    fetchChats(seller._id);
  }, [seller]);

  return (
    <div className="w-[90%] bg-white m-5 h-[85vh] overflow-y-scroll rounded">
      {!open && (
        <>
          <h2 className="text-center text-[30px] py-3 font-Poppins">
            All Messages
          </h2>
          {/* All message list */}
          {chats &&
            chats.map((chat, index) => (
              <MessageComp
                chat={chat}
                key={index}
                index={index}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                setOpen={setOpen}
              />
            ))}
        </>
      )}

      {open && <SellerInbox setOpen={setOpen} />}
    </div>
  );
};

const MessageComp = ({ index, chat, activeIndex, setActiveIndex, setOpen }) => {
  console.log(chat);
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`?${id}`);
    setOpen(true);
  };
  return (
    <div
      className={`w-full flex p-4  ${
        activeIndex === index ? "bg-transparent" : "bg-gray-100"
      } rounded-lg shadow cursor-pointer hover:bg-gray-200 transition duration-300`}
      onClick={() => setActiveIndex(index) || handleClick(chat._id)}
    >
      <div className="relative">
        <img
          src="http://localhost:8000/apple-iphone-15-pro-max-4-1717363637948-383702051.png"
          className="w-[60px] h-[60px] rounded-full border-2 border-gray-300"
          alt="Profile Picture"
        />
        <div className="w-[14px] h-[14px] bg-green-500 rounded-full absolute top-0 right-0 border-2 border-white"></div>
      </div>
      <div className="pl-4 flex-1">
        <h1 className="text-[18px] font-semibold">Micheal Sunday</h1>
        <p className="text-[16px] text-gray-600 truncate">
          You: How are you doing today?
        </p>
      </div>
    </div>
  );
};

const SellerInbox = ({ setOpen }) => {
  return (
    <div className="w-full min-h-full flex flex-col justify-between bg-white rounded-lg shadow-md">
      {/* Message header */}
      <div className="w-full flex items-center justify-between p-4 bg-[#3321c8]/10 rounded-t-lg border-b border-gray-200">
        <div className="flex items-center">
          <img
            src="http://localhost:8000/apple-iphone-15-pro-max-4-1717363637948-383702051.png"
            className="w-[60px] h-[60px] rounded-full border-2 border-gray-300"
            alt="Profile"
          />
          <div className="pl-3">
            <h1 className="text-[18px] font-semibold text-[#3321c8]">
              Micheal Sunday
            </h1>
            <h2 className="text-sm text-gray-600">Active Now</h2>
          </div>
        </div>
        <AiOutlineArrowLeft
          size={24}
          className="cursor-pointer text-gray-700 hover:text-[#3321c8] transition duration-300"
          onClick={() => setOpen(false)}
        />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Placeholder for messages */}
        <div className="flex flex-col space-y-4">
          {/* Example messages */}
          <div className="self-start bg-gray-200 p-3 rounded-lg">Hello!</div>
          <div className="self-end bg-[#3321c8] text-white p-3 rounded-lg">
            Hi, how are you?
          </div>
        </div>
      </div>

      {/* Message input */}
      <form
        aria-required={true}
        className="p-4 border-t border-gray-200 flex items-center space-x-3"
      >
        <label htmlFor="image" className="cursor-pointer">
          <TfiGallery className="text-[#3321c8]" size={24} />
          <input type="file" id="image" className="hidden" />
        </label>
        <input
          type="text"
          required
          placeholder="Enter your message..."
          className="flex-1 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3321c8] focus:border-transparent"
          // value={newMessage}
          // onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          type="submit"
          className="flex items-center justify-center bg-[#3321c8] text-white p-2 rounded-full hover:bg-[#2719a9] transition duration-300"
        >
          <AiOutlineSend size={24} />
        </button>
      </form>
    </div>
  );
};

export default DashboardMessages;
