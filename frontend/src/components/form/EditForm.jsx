import React, { useState, useEffect } from "react";
import Editorview from "./Editorview";
import Userview from "./Userview";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function EditForm({formData, setFormData, formInfo, setFormInfo}) {
  const questionTypes = [
    { value: "text", label: "Text" },
    { value: "radio", label: "Multiple choice" },
    { value: "checkbox", label: "Checkbox" },
  ];

  // We have 3 type of answers (paragraph, radio, checkbox)
  const defaultTemplate = {
    qtype: questionTypes[1],
    required: false,
    question: { text: "Question", image: { public_id: "", url: "" } },
    optionsList: [
      { text: "", image: { public_id: "", url: "" }, checked: false },
    ],
  };

 
  const [open, setOpen] = useState(0);

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { id } = useParams();

  useEffect(() => {
    async function fetchFormData() {
      try {
        const response = await axios.get(`${BASE_URL}/form/${id}`, {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        });
        const data = response?.data;
        // console.log(data);
        if (data.length === 0) alert("Form not found");
        setFormData(data[0]?.questions);
        setFormInfo({ name: data[0]?.name, description: data[0]?.description });
      } catch (error) {
        alert(error.response.data.message);
      }
    }
    fetchFormData();
    //
  }, [BASE_URL, id]);

  const handleAppendNewQuestion = () => {
    const updatedFormData = [...formData];
    updatedFormData.push(defaultTemplate);
    setFormData(updatedFormData);
  };

  return (
    <div className="">
      {/* Notification */}
      <div className="text-red-600 py-2">Click on save to save your form</div>
      {/* Form header */}
      <div className="border-t-8 border-t-primary rounded-md bg-white px-5 py-5 mb-4">
        <input
          type="text"
          name="form-name"
          id="form-name"
          placeholder="Form name"
          value={formInfo?.name}
          onChange={(event) =>
            setFormInfo({ ...formInfo, name: event.target.value })
          }
          className="outline-none w-full text-xl border-b border-b-gray-200  focus:border-b-primary duration-200 mb-4 py-1 "
        />

        <input
          type="text"
          name="form-description"
          id="form-description"
          placeholder="From description"
          value={formInfo?.description}
          onChange={(event) =>
            setFormInfo({ ...formInfo, description: event.target.value })
          }
          className="outline-none w-full text-sm border-b border-b-gray-200  focus:border-b-primary duration-200 py-1"
        />
      </div>

      {/* Questions list */}
      <div>
        {formData &&
          formData.map((q, index) => (
            <div
              key={index}
              className={`bg-white rounded-md mb-4  ${
                index === open && "border-l-4 border-l-blue-500"
              } `}
            >
              {index === open ? (
                // Editor View
                <Editorview
                  q={q}
                  questionIndex={index}
                  formData={formData}
                  setFormData={setFormData}
                  questionTypes={questionTypes}
                  defaultTemplate={defaultTemplate}
                />
              ) : (
                // User View
                <Userview q={q} questionIndex={index} setOpen={setOpen} />
              )}
            </div>
          ))}
      </div>

      {/* Add question button */}
      <div className="flex items-center justify-center">
        <button
          onClick={handleAppendNewQuestion}
          className="bg-primary text-white font-medium rounded-full px-6 py-2 border border-primary"
        >
          <span>Add question</span>
        </button>
      </div>
    </div>
  );
}
