import { useState } from "react";
import Header from "../components/Layout/Header";
import ProfileSideBar from "../components/Profile/ProfileSideBar";
import ProfileContent from "../components/Profile/ProfileContent";
import styles from "../styles/styles";

const ProfilePage = () => {
  const [active, setActive] = useState(1);
  return (
    <>
      <Header />
      <div className={`${styles.section} flex bg-[#f5f5f5] py-10 h-screen`}>
        <div className="w-[50px] 800px:w-[335px] sticky 800px:mt-0 mt-[18%]">
          <ProfileSideBar active={active} setActive={setActive} />
        </div>
        <ProfileContent active={active} />
      </div>
    </>
  );
};

export default ProfilePage;
