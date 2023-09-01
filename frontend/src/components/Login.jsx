import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import axios from "axios";

export default function Login() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const loginWithGoogle = async (userObj) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, userObj, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = response.data;

      if (json.success) {
        localStorage.setItem("auth-token", json.authToken);
        window.location.reload();
      } else {
        alert(json.error);
      }
    } catch (error) {
      alert("An error occurred");
    }
  };
  return (
    <section className="flex pt-40 items-center justify-center">
      <div className="border-2 border-primary shadow-md rounded-md px-4 pt-4 pb-16">
        <p className="text-center font-semibold text-lg mb-8">LOGIN</p>
        <GoogleLogin
          onSuccess={(response) => {
            console.log("Credentials: ", response.credential);
            const decoded = jwt_decode(response.credential);
            const userObj = {
              name: decoded.name,
              email: decoded.email,
              googleId: decoded.sub,
              emailVerified: decoded.email_verified,
              picture: decoded.picture,
            };

            loginWithGoogle(userObj);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
          auto_select
        />
      </div>
    </section>
  );
}
