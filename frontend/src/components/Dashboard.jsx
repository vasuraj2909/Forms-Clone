import React, { useState, useEffect } from "react";
import { plus } from "../assets";
import axios from "axios";
import { Link } from "react-router-dom";
import { logo } from "../assets";

export default function Dashboard() {
  const [forms, setForms] = useState();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${BASE_URL}/form/forms`, {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        });

        const data = response?.data;
        setForms(data);
      } catch (error) {
        alert(error.response.data.message);
      }
    }

    fetchData();
  }, [BASE_URL]);

  const createNewForm = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/form/create`, null, {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      });
      const json = response.data;
      console.log("Form created: ", json);
      window.location.href = `/form/${json._id}/edit`;
    } catch (error) {
      alert("Could not create form: " + error.response.data.message);
    }
  };

  return (
    <section>
      <div style={{ backgroundColor: "#f1f3f4" }}>
        <div className="max-w-screen-lg mx-auto py-4 px-5">
          <div className="sm:hidden w-full mx-auto">
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Search"
              className="px-4 py-2 mb-4 rounded-md bg-white w-full max-w-xl outline-none border border-gray-50 focus:border-primary"
            />
          </div>
          <div className="flex space-x-4 items-center">
            <button onClick={createNewForm}>
              <img
                src={plus}
                alt="plus-icon"
                width={100}
                height={100}
                className="border  hover:border-purple-700 duration-200"
              />
            </button>
            <h2 className="font-medium">Create new form</h2>
          </div>
        </div>
      </div>
      <div className="max-w-screen-lg mx-auto py-3 px-5">
        <h2 className="mb-4 font-semibold">Recent forms</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {forms &&
            forms?.map((form, index) => (
              <Link key={form._id} to={`/form/${form._id}/edit`}>
                <div className="border rounded-md hover:border-primary duration-200 divide-y">
                  <figure className=" aspect-[4/3] flex items-center justify-center bg-secondary  rounded-t-md">
                    <img src={logo} alt="" width={80} />
                  </figure>
                  <div className="p-3">
                    <p className="font-medium ">{form.name}</p>
                    <p className="text-xs">_id: {form._id}</p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
