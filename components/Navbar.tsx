import { useState } from "react";
import MobileMenu from "./MobileMenu";
import NavbarItem from "./NavbarItem";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <nav className="w-full fixed z-40">
      <div className="px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 bg-zinc-900 bg-opacity-90 ">
        <img src="/images/logo.png" className="h-4 lg:h-7" alt="logo" />
        <div className="flex-row ml-8 gap-7 lg:flex hidden">
          <NavbarItem label="Home" />
          <NavbarItem label="Series" />
          <NavbarItem label="Films" />
          <NavbarItem label="New & Popular" />
          <NavbarItem label="My List" />
          <NavbarItem label="Browse by languages" />
        </div>
        <div
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="lg:hidden transition selection:normal-case duration-300 flex flex-row items-center gap-2 cursor-pointer ml-8 relative"
        >
          <p className="text-white text-sm">Browse</p>
          {showMobileMenu ? (
            <BsChevronUp className="text-white transition duration-300" />
          ) : (
            <BsChevronDown className="text-white transition duration-300" />
          )}
          <MobileMenu visible={showMobileMenu} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
