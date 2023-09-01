import React from "react";

export default function ProfileExpand({ setExpand }) {
  const handleLogout = () => {
    setExpand(false);
    const shouldDelete = window.confirm("Logout!");

    if (shouldDelete) {
      localStorage.removeItem("auth-token");
      window.location.replace("/");
    }
  };

  return (
    <div className="bg-white  p-3 rounded-md w-44 border">
      <button
        onClick={handleLogout}
        className="px-4 py-[6px] mb-2 rounded-md bg-gray-100 w-full hover:bg-red-200 duration-150"
      >
        Logout
      </button>
    </div>
  );
}
