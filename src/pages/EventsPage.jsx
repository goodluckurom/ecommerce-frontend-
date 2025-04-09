import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EventCard from "../components/Events/EventCard";
import Header from "../components/Layout/Header";
import { getAllEvents } from "../redux/actions/event";
import Loader from "../components/Layout/Loader";
import Footer from "../components/Route/Footer/Footer";
import noEventsSvg from "../Assets/17.svg";

const EventsPage = () => {
  const dispatch = useDispatch();
  const { events, isLoading } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(getAllEvents());
    window.scrollTo(0, 0);
  }, [dispatch]);

  return (
    <>
      <Header activeHeading={4} />
      <div className="flex flex-col min-h-screen">
        {isLoading ? (
          <div className="flex-grow flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div className="flex-grow w-[90%] m-auto pt-2">
            {events.length < 1 ? (
              <div className="h-screen w-full flex items-center justify-center flex-col">
                <img
                  src={noEventsSvg}
                  className=" mx-auto"
                  width={400}
                  height={400}
                  alt="No Events"
                />
                <h2 className="text-2xl font-bold text-center text-[#3321c8]">
                  Currently No Running Events, Check Back Later....
                </h2>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {events.map((event, index) => (
                  <EventCard data={event} key={index} />
                ))}
              </div>
            )}
          </div>
        )}
        <Footer />
      </div>
    </>
  );
};

export default EventsPage;
