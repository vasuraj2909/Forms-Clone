import React, { useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { IoCopyOutline, IoTrashOutline } from "react-icons/io5";
import { Switch } from "@mantine/core";
import Select from "react-select";
import Options from "./Options";
import axios from "axios";
import ImageUploadModal from "./ImageUploadModal";

export default function Editorview({
  q,
  questionIndex,
  formData,
  setFormData,
  questionTypes,
  defaultTemplate,
}) {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [modal, setModal] = useState(false);

  // console.log("FormData: ", formData)

  const handleQuestionTypeChange = (selectedType) => {
    const updatedFormData = formData.map((question, i) => {
      if (i === questionIndex) {
        const updatedQuestion = {
          ...question,
          qtype: selectedType,
        };

        return updatedQuestion;
      }

      return question;
    });

    setFormData(updatedFormData);
  };

  const handleRequired = (checked) => {
    const updatedFormData = formData.map((question, i) => {
      if (i === questionIndex) {
        return { ...question, required: checked };
      }
      return question;
    });
    setFormData(updatedFormData);
  };

  const handleAddNewQuestion = () => {
    const updatedFormData = [...formData];
    updatedFormData.splice(questionIndex + 1, 0, defaultTemplate);
    setFormData(updatedFormData);
  };

  const handleQuestionTextChange = (value) => {
    const updatedFormData = [...formData];
    updatedFormData[questionIndex] = {
      ...updatedFormData[questionIndex],
      question: {
        ...updatedFormData[questionIndex].question,
        text: value,
      },
    };
    setFormData(updatedFormData);
  };

  const handleCopyQuestion = () => {
    const updatedFormData = [...formData];
    updatedFormData.splice(questionIndex + 1, 0, formData[questionIndex]);
    setFormData(updatedFormData);
  };

  const handleDeleteQuestion = () => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (shouldDelete) {
      const updatedFormData = formData.filter((item, i) => i !== questionIndex);
      setFormData(updatedFormData);
    }
  };

  const handleOnChangeQuestionImage = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader(null);

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const updatedFormData = [...formData];
        updatedFormData[questionIndex] = {
          ...updatedFormData[questionIndex],
          question: {
            ...updatedFormData[questionIndex].question,
            image: { public_id: "", url: reader.result },
          },
        };

        setFormData(updatedFormData);
      };
    }
  };

  return (
    <div className="px-5 pt-5 pb-2">
      <div className="mb-4">
        <div className="flex justify-between space-x-4 items-center">
          <div className="w-2/3">
            <input
              type="text"
              name="ques"
              id="ques"
              value={q?.question.text}
              placeholder="Question 1"
              onChange={(e) => handleQuestionTextChange(e.target.value)}
              className="outline-none text-lg w-full border-b border-b-gray-200  focus:border-b-primary duration-200 mb-4 py-1"
            />
          </div>

          <div>
            <button
              onClick={() => setModal(true)}
              className="cursor-pointer bg-gray-50 hover:bg-gray-100 duration-150 p-2 rounded-full flex justify-center items-center "
            >
              <BiImageAdd size={25} className="text-gray-500" />
            </button>
            {modal && (
              <ImageUploadModal
                setModal={setModal}
                questionIndex={questionIndex}
                formData={formData}
                setFormData={setFormData}
              />
            )}
          </div>

          {/* Select Question type  */}
          <div className="w-1/3">
            <Select
              options={questionTypes}
              // defaultValue={q.qtype}
              value={q.qtype}
              onChange={(item) => handleQuestionTypeChange(item)}
            />
          </div>
        </div>

        {/* Question Image */}
        {q.question.image.url && (
          <div className="aspect-video w-52">
            <img
              src={q.question.image.url}
              alt="Question"
              className="object-contain w-full h-full"
            />
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
          <Options
            formData={formData}
            setFormData={setFormData}
            questionIndex={questionIndex}
          />
        )}
      </div>

      {/* Question right bottom */}
      <hr className="mt-8 mb-1" />
      <div className="flex  justify-end space-x-2 items-center">
        <Switch
          checked={q.required}
          labelPosition="left"
          label="Required"
          onLabel="No"
          offLabel="Yes"
          onChange={(event) => handleRequired(event.currentTarget.checked)}
        />
        <p className="text-gray-400 font-light text-2xl pb-2">|</p>
        <button
          onClick={handleDeleteQuestion}
          className="p-2 rounded-full bg-gray-50 hover:bg-gray-100"
        >
          <IoTrashOutline size={17} className="text-gray-600 " />
        </button>
        <button
          onClick={handleCopyQuestion}
          className="p-2 rounded-full bg-gray-50 hover:bg-gray-100"
        >
          <IoCopyOutline size={17} className="text-gray-600" />
        </button>
        <button
          className="p-2 rounded-full bg-gray-50 hover:bg-gray-100"
          onClick={handleAddNewQuestion}
        >
          <AiOutlinePlusCircle size={20} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
}
