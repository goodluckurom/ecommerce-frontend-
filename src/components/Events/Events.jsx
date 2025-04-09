/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import EventCard from "./EventCard";
import { useEffect } from "react";
import { getAllEvents } from "../../redux/actions/event";
import Loader from "../Layout/Loader";

const Events = ({ events }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  return (
    <div className={`${styles.section}`}>
      <div className={`${styles.heading}`}>
        <h1>Popular Events</h1>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {events.length === 0 ? (
            <div>
              <h2>No Events!!!</h2>
            </div>
          ) : (
            <div className="w-full">
              {events.map((event) => (
                <EventCard key={event._id} data={event} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Events;
