import Header from "../components/Layout/Header";
import Footer from "../components/Route/Footer/Footer";
import TrackOrderStatus from "../components/Profile/TrackOrderStatus";

const TrackOrderPage = () => {
  return (
    <div>
      <Header />
      <div className="bg-[url('/map.jpg')] bg-cover bg-center h-screen w-full ">
        <TrackOrderStatus />
      </div>

      <Footer />
    </div>
  );
};

export default TrackOrderPage;
