/* eslint-disable react/prop-types */
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";

const Ratings = ({ rating }) => {
  const stars = [];

  for (let index = 1; index <= 5; index++) {
    if (index <= rating) {
      stars.push(
        <AiFillStar
          key={index}
          size={20}
          color="#f6b100"
          className="cursor-pointer mr-2"
        />
      );
    } else if (index === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(
        <BsStarHalf
          key={index}
          color="#f6b100"
          size={20}
          className="mr-2 cursor-pointer"
        />
      );
    } else {
      stars.push(
        <AiOutlineStar
          key={index}
          size={20}
          color="#f6ba00"
          className="mr-2 cursor-pointer"
        />
      );
    }
  }

  return <div className="flex">{stars}</div>;
};

export default Ratings;
