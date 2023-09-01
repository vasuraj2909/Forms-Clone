import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function UserView() {
  const [formData, setFormData] = useState([]);
  const [submited, setSubmited] = useState(false);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { id } = useParams();

  useEffect(() => {
    async function fetchFormData() {
      try {
        const response = await axios.get(`${BASE_URL}/form/responding/${id}`);
        const data = response?.data;
        if (data.length === 0) alert("Form not found");
        setFormData(data);
      } catch (error) {
        alert(error.response.data.message);
      }
    }
    fetchFormData();
    //
  }, [BASE_URL, id]);

  console.log(formData);

  const handleTextAnswers = (questionIndex, value) => {
    const updatedFormData = { ...formData };
    if (updatedFormData.questions) {
      updatedFormData.questions[questionIndex].textAnswer = value;
    }

    setFormData(updatedFormData);
  };

  const handleOptionAnswers = (questionIndex, optionIndex, type, value) => {
    const updatedFormData = { ...formData };
    console.log("value: ", value);

    if (type === "radio") {
      updatedFormData.questions[questionIndex].selectedMcqIndex = optionIndex;
      setFormData(updatedFormData);
    } else {
      const question = updatedFormData.questions[questionIndex];
      question.optionsList[optionIndex].checked =
        !question.optionsList[optionIndex].checked;
    }

    setFormData(updatedFormData);
  };

  const submitResponse = async (e) => {
    e.preventDefault();
    const data = {
      formId: formData._id,
      name: formData.name,
      description: formData.description,
      questions: formData.questions,
    };

    try {
      await axios.post(`${BASE_URL}/response/send`, { data });
      setSubmited(true);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <section className="min-h-screen bg-secondary ">
      {submited ? (
        <div className="h-screen w-screen flex items-center justify-center">
          <h2 className="text-xl font-semibold">Form submited!</h2>
        </div>
      ) : (
        <div className="max-w-screen-md mx-auto py-2 px-3">
          {formData && (
            <div>
              {/* Form header */}
              <div className="border-t-8 border-t-primary rounded-md bg-white pt-3 pb-2 mb-4">
                <div className="px-5 mb-1">
                  <h2 className="font-semibold text-xl">{formData?.name}</h2>
                  <p>{formData?.description}</p>
                </div>
                <hr />
                <p className="text-red-500 text-xs px-5 mt-3">
                  * Indicates required question
                </p>
              </div>

              <form action="" onSubmit={submitResponse}>
                {formData.questions?.map((q, questionIndex) => (
                  <div
                    key={q._id}
                    className="bg-white px-5 py-4 rounded-md mb-3"
                  >
                    <div className="mb-4">
                      <p className="text-lg w-full text-black mb-1">
                        {q.question.text}{" "}
                        <span
                          className={`text-red-600 ${!q.required && "hidden"}`}
                        >
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
                        <div>
                          <input
                            type="text"
                            name="answer"
                            id="answer"
                            required={q.required}
                            placeholder="Your answer"
                            onChange={(e) =>
                              handleTextAnswers(questionIndex, e.target.value)
                            }
                            className="outline-none w-full border-b border-b-gray-200  focus:border-b-primary duration-200 mb-4 py-1"
                          />
                        </div>
                      ) : (
                        <div>
                          {q.optionsList.map((option, optIndex) => {
                            return (
                              <div key={option._id} className="mb-3">
                                <div className="flex space-x-2 items-center mb-1">
                                  <input
                                    type={q?.qtype.value}
                                    name={`option-${q._id}`}
                                    id={`option-${q._id}`}
                                    required={
                                      q.required && q?.qtype.value === "radio"
                                    }
                                    onChange={(event) =>
                                      handleOptionAnswers(
                                        questionIndex,
                                        optIndex,
                                        q.qtype.value,
                                        event.target.value
                                      )
                                    }
                                    className="w-5 h-5 cursor-pointer"
                                  />
                                  <label>{option.text}</label>
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
                ))}
                <div className="flex justify-between items-center mb-20">
                  <button
                    onClick={() => window.location.reload()}
                    className="text-primary hover:font-semibold duration-300"
                  >
                    Clear form
                  </button>
                  <input
                    type="submit"
                    value="Submit"
                    className="bg-primary cursor-pointer text-white px-5 py-[6px] rounded-md hover:scale-105 duration-200"
                  />
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
