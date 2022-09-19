import React from "react";
import assets from "../config/img/assets-storage.ts";

const Header = () => {
  return (
    <>
      <img
        className="max-w-[15rem]"
        alt="logo-company"
        src={assets.public.logo}
      />
    </>
  );
};
export default Header;
