import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
  {
    image: "/Screenshot (193).png",
    description: `Black Friday Blowout!
Score big this Black Friday with our unbeatable offer:
shop now and enjoy a whopping 50% off on all products!
From electronics to fashion, indulge in guilt-free shopping
and save big on your favorite items. Hurry, grab the deals
 before they're gone – this is one sale you don't want to miss!`,
    link: "/products",
    buttonText: "SHOP NOW",
  },
  {
    image: "/Screenshot (195).png",
    description: `Fashion Frenzy!...Elevate your style with 
    our exclusive clothing sale! Discover the latest trends
    and wardrobe essentials at irresistible prices. From casual
    wear to statement pieces, find everything you need to refresh
     your look. Don't miss out – shop now and upgrade your wardrobe
      in style!`,
    link: "/products",
    buttonText: "SHOP CLOTHES",
  },
  {
    image: "/Screenshot (194).png",
    description: `Retail Revolution!...Embark on an unforgettable
     shopping journey with our all-encompassing ecommerce extravaganza!
      Explore a vast array of products ranging from electronics to fashion,
      all at unbeatable prices. Whether you're upgrading your tech or refreshing
       your wardrobe, find everything you need right here. Don't miss out –
       dive into the deals and shop smarter today!`,
    link: "/products",
    buttonText: "EXPLORE",
  },
  {
    image: "/Screenshot (197).png",
    description: `Black Friday Blitz!... \nGet ready for the 
    ultimate Black Friday sale – unbeatable deals await! From
    electronics to fashion, shop top brands at jaw-dropping prices.
     Don't miss out – shop now and save big!`,
    link: "/products",
    buttonText: "Shop Collection ",
  },
  {
    image: "/Screenshot (196).png",
    description: `Cyber Monday Spectacular!
Gear up for Cyber Monday and unlock incredible
savings on your favorite products! From tech gadgets to
fashion must-haves, shop top brands at unbeatable prices.
 Don't miss out – dive into the deals and shop smart on Cyber
 Monday!`,
    link: "/products",
    buttonText: "SHOP NOW",
  },
];

const getBoxPositionClass = (index) => {
  if (index % 3 === 0) {
    return "top-1/2 left-8 transform -translate-y-1/2";
  } else if (index % 3 === 1) {
    return "top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2";
  } else {
    return "top-1/2 right-8 transform -translate-y-1/2";
  }
};

const Hero = () => {
  const settings = {
    dots: true,
    dotsClass: "slick-dots custom-dots", // Custom class for dots
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="relative overflow-hidden">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            <img
              src={slide.image}
              alt={slide.description}
              className="w-full h-[90vh] object-cover"
            />
            <div
              className={`absolute p-4 w-[50%] rounded bg-white bg-opacity-75 ${getBoxPositionClass(
                index
              )}`}
              style={{ maxWidth: "80%" }}
            >
              <h2 className="text-center break-words text-wrap">
                {slide.description}
              </h2>
              <a href={slide.link}>
                <button className="block mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 transition duration-300">
                  {slide.buttonText}
                </button>
              </a>
            </div>
          </div>
        ))}
      </Slider>
      {/* Custom dots styling */}
      <style>{`
        .custom-dots {
          bottom: 20px; /* Adjust the distance from the bottom */
        }
        .custom-dots li {
          margin: 0 5px; /* Adjust the spacing between dots */
        }
        .custom-dots li button {
          width: 10px; /* Adjust the size of dots */
          height: 10px;
          border-radius: 50%;
          background-color: #fff; /* Change the color of dots */
        }
        .custom-dots li.slick-active button {
          background-color: #000; /* Change the color of active dot */
        }
      `}</style>
    </div>
  );
};

export default Hero;
