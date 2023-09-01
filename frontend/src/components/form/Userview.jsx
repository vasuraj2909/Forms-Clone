import React from "react";

export default function Userview({ q, questionIndex, setOpen }) {
  return (
    <div
      onClick={() => setOpen(questionIndex)}
      className="cursor-pointer px-5 pt-5 pb-2"
    >
      <div className="">
        <div className="mb-4">
          <p className="text-lg w-full text-black mb-1">
            {q.question.text}{" "}
            <span className={`text-red-600 ${!q.required && "hidden"}`}>*</span>
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
            <div>
              <input
                type="text"
                name="answer"
                id="answer"
                placeholder="Your answer"
                className="outline-none w-full border-b border-b-gray-200  focus:border-b-primary duration-200 mb-4 py-1"
              />
            </div>
          ) : (
            <div>
              {q.optionsList.map((option, optIndex) => {
                return (
                  <div
                    key={optIndex}
                    className="mb-3"
                  >
                    <div className="flex space-x-2 items-center mb-1" >
                      <input
                        type={q?.qtype.value}
                        name="option"
                        id="option"
                        disabled
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
          )}
        </div>
      </div>
    </div>
  );
}
