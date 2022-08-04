import React from "react";
import { assets } from "../config/img/assets-storage";

const Header = () => {
  return (
    <>
      <img className="max-w-sm" alt="logo-company" src={assets.public.logo} />
    </>
  );
};
export default Header;
