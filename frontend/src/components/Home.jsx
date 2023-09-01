import React, { useContext } from "react";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Navbar from "./Navbar";
import userContext from "../context/user/userContext";

export default function Home() {
  const {user} = useContext(userContext);
  // console.log(user.data);
  return (
    <section>
      <Navbar />
      <div className="py-16">
        {user.loading ? (
          <span></span>
        ) : user.data !== null ? (
          <Dashboard />
        ) : (
          <Login />
        )}
      </div>
    </section>
  );
}
