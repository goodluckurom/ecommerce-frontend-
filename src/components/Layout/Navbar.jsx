/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { navItems } from "../../static/data";

const Navbar = ({ active }) => {
  return (
    <div className={`block 800px:${styles.noramlFlex}`}>
      {navItems &&
        navItems.map((i, index) => (
          <div className="flex" key={index + i}>
            <Link
              to={i.url}
              className={`${
                active === index + 1 ? "text-[#17dd1f]" : " 800px:text-[#fff]"
              } pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer}`}
            >
              {i.title}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Navbar;
