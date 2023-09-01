import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";

export default function Response() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { id } = useParams();
  const [responseData, setResponseData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    async function fetchResponses() {
      try {
        const response = await axios.get(`${BASE_URL}/response/get/${id}`, {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        });
        setResponseData(response.data);
      } catch (error) {
        alert(error.response.data.message);
      }
    }
    fetchResponses();
  }, []);

  console.log(responseData);

  return (
    <div>
      <div className="rounded-md bg-white border py-3 mb-4">
        <h2 className="font-semibold text-lg px-5">
          {responseData?.length} Responses
        </h2>
        <hr className="my-3" />
        <div className="flex items-center px-5 space-x-2">
          <button
            disabled={activeIndex === 0}
            onClick={() => setActiveIndex(activeIndex - 1)}
            className={`rounded-full p-1 bg-gray-50  disabled:text-gray-300`}
          >
            <MdOutlineNavigateBefore size={23} />
          </button>
          <span>{activeIndex + 1}</span>
          <span>of</span>
          <span>{responseData.length}</span>
          <button
            onClick={() => setActiveIndex(activeIndex + 1)}
            className=" rounded-full p-1 bg-gray-50"
          >
            <MdOutlineNavigateNext size={23} />
          </button>
        </div>
      </div>

      <div className="border-t-8 border-t-primary rounded-md bg-white border py-3 px-5 mb-4">
        <p className="font-semibold text-lg mb-1">
          {responseData[activeIndex]?.name}
        </p>
        <p>{responseData[activeIndex]?.description}</p>
      </div>

      {responseData[activeIndex]?.questions?.map((q, questionIndex) => {
        return (
          <div className="rounded-md bg-white border py-4 px-5 mb-4">
            <div className="mb-4">
              <p className="text-lg w-full text-black mb-1">
                {q.question.text}{" "}
                <span className={`text-red-600 ${!q.required && "hidden"}`}>
                  *
                </span>
              </p>
              {/* Question Image */}
              {q.question.image.url && (
                <div className="w-52">
                  <img src={q.question.image.url} alt="question" />
                </div>
              )}
            </div>

            {/* Answer or options */}
            <div>
              {q.qtype.value === "text" ? (
                <p>{q.textAnswer}</p>
              ) : q.qtype.value === "checkbox" ? (
                <div>
                  {q.optionsList.map((option, optIndex) => {
                    return (
                      <div key={optIndex} className="mb-3">
                        <div className="flex space-x-2 items-center mb-1">
                          <input
                            readOnly
                            type={q?.qtype.value}
                            name="option"
                            id="option"
                            checked={option.checked}
                            className="w-5 h-5"
                          />
                          <label htmlFor="option">{option.text}</label>
                        </div>
                        {/* Option image */}
                        {option?.image?.url && (
                          <div className="aspect-video w-44 ml-6">
                            <img
                              src={option.image.url}
                              alt="Option"
                              className="object-contain w-full h-full"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div>
                  {q.optionsList.map((option, optIndex) => {
                    return (
                      <div key={optIndex} className="mb-3">
                        <div className="flex space-x-2 items-center mb-1">
                          <input
                            type="radio"
                            readOnly
                            name={`option-${q._id}`}
                            id={`option-${q._id}`}
                            checked={optIndex === q.selectedMcqIndex}
                            className="w-5 h-5"
                            s
                          />
                          <label htmlFor="option">{option.text}</label>
                        </div>
                        {/* Option image */}
                        {option?.image?.url && (
                          <div className="aspect-video w-44 ml-6">
                            <img
                              src={option.image.url}
                              alt="Option"
                              className="object-contain w-full h-full"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {responseData[activeIndex] && (
        <div className="flex justify-end text-xs">
          <p>Submited At: {responseData[activeIndex]?.createdAt}</p>
        </div>
      )}
    </div>
  );
}
