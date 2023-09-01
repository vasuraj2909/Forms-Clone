import React, { useState, useContext } from "react";
import { logo } from "../assets";
import { Link } from "react-router-dom";
import userContext from "../context/user/userContext";
import ProfileExpand from "./ProfileExpand";

export default function Navbar() {
  const { user } = useContext(userContext);
  const [expand, setExpand] = useState(false);

  return (
    <nav className="w-full backdrop-blur-sm shadow-sm fixed top-0 z-20">
      {/* For laptop view */}
      <div className="flex max-w-screen-xl mx-auto h-16 justify-between items-center px-5">
        <div className="">
          <Link to="/" className="flex space-x-2 items-center">
            <img src={logo} alt="logo" width={35} height={35} />
            <h2 className="text-gray-500 font-semibold text-xl">AK Forms</h2>
          </Link>
        </div>
        <div className="hidden sm:block w-96 mx-auto">
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search"
            className="px-4 py-2 rounded-md bg-gray-100 w-full max-w-xl outline-none border border-gray-50 focus:border-gray-200"
          />
        </div>
        {user.loading ? (
          <span></span>
        ) : (
          user.data !== null && (
            <div className="relative">
              <button
                onClick={() => {
                  setExpand(!expand);
                }}
                className="rounded-full p-[3px] hover:bg-gray-100"
              >
                <img
                  src={user.data.picture}
                  alt="profile"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </button>

              {expand && (
                <div className="absolute right-0">
                  <ProfileExpand setExpand={setExpand} />
                </div>
              )}
            </div>
          )
        )}

        {/* <Burger
          className="lg:hidden z-50"
          opened={nav}
          onClick={() => {
            setNav(!nav);
          }}
          aria-label={label}
        /> */}
      </div>
    </nav>
  );
}
