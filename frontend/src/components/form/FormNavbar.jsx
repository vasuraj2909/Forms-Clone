import React, { useState, useContext } from "react";
import { logo } from "../../assets";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import userContext from "../../context/user/userContext";
import { IoTrashOutline } from "react-icons/io5";
import ProfileExpand from "../ProfileExpand";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function FormNavbar({
  response,
  setResponse,
  formData,
  formInfo,
  setFormInfo,
}) {
  const { user } = useContext(userContext);
  const [expand, setExpand] = useState(false);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  // Get the current form id from url
  const { id } = useParams();

  const handleDeleteForm = async () => {
    const shouldDelete = window.confirm("Delete form!");
    if (shouldDelete) {
      try {
        await axios.delete(`${BASE_URL}/form/deleteform/${id}`, {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        });
        window.location.replace("/");
      } catch (error) {
        alert(error.response.data.message);
      }
    }
  };

  const handleSaveForm = async () => {
    const data = {
      name: formInfo.name,
      description: formInfo.description,
      questions: formData,
    };
    try {
      await axios.put(`${BASE_URL}/form/editform/${id}`, data, {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      });
      alert("Form Saved Successfully");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <nav className="w-full bg-white shadow-sm fixed top-0 z-20">
      {/* For laptop view */}
      <div className="flex max-w-screen-xl mx-auto h-16 justify-between items-center px-3">
        <div className="flex justify-center items-center space-x-1">
          <Link to="/" className="flex space-x-2 items-center">
            <img src={logo} alt="logo" width={35} height={35} />
          </Link>
          <input
            type="text"
            name="form-name"
            id="form-name"
            value={formInfo?.name}
            placeholder="Untitled Form"
            onChange={(e) => {
              setFormInfo({ ...formInfo, name: e.target.value });
            }}
            className="text-lg outline-none focus:border-b border-b-primary w-32 duration-200"
          />
        </div>

        <div className="flex space-x-3 items-center">
          <button
            onClick={handleSaveForm}
            className="bg-secondary font-medium hover:scale-105 duration-200 text-primary border  border-primary px-5 py-[6px] rounded-md text-xs"
          >
            Save
          </button>
          {/* <button className="bg-primary font-medium hover:scale-105 duration-200 text-white border border-primary px-5 py-[6px] rounded-md text-xs">
            Send
          </button> */}
          <a href={`/form/${id}/viewform`} target="_blank">
            <div className="rounded-full p-2 bg-gray-50 hover:bg-gray-200">
              <AiOutlineEye size={20} />
            </div>
          </a>

          <button
            onClick={handleDeleteForm}
            className="rounded-full p-2 bg-gray-50 hover:bg-gray-200"
          >
            <IoTrashOutline size={20} />
          </button>

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
        </div>
      </div>

      {/* tabs */}
      <div className="flex justify-center items-end gap-4 font-medium text-sm mb-1">
        <button
          onClick={() => setResponse(false)}
          className={`border-b-2 border-white ${
            !response && "border-b-primary"
          }  duration-200 pb-[2px] px-2`}
        >
          Questions
        </button>

        <button
          onClick={() => setResponse(true)}
          className={`border-b-2 border-white ${
            response && "border-b-primary"
          }  duration-200pb-[2px] px-2`}
        >
          Responses
        </button>
      </div>
    </nav>
  );
}
