import React, { useState, useEffect } from "react";
import userContext from "./userContext";
import axios from "axios";
const UserProvider = (props) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [user, setUser] = useState({ loading: true, data: null });

  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      getUser();
    } else {
      setUser({ ...user, loading: false });
    }
  }, []);

  // Get logged in user
  const getUser = () => {
    axios({
      method: "get",
      url: `${BASE_URL}/user/getuser`,
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        // console.log("User: ", response);
        setUser({ loading: false, data: response?.data });
      })
      .catch((error) => {
        setUser({ ...user, loading: false });
        alert(error.response.data.message);
      });
  };

  return (
    <userContext.Provider value={{ user }}>
      {props.children}
    </userContext.Provider>
  );
};

export default UserProvider;
