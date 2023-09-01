import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiImageAdd } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import ImageUploadModal from "./ImageUploadModal";

export default function Options({ formData, setFormData, questionIndex }) {
  const [modal, setModal] = useState(false);
  const [optionIndex, setOptionIndex] = useState();

  const handleAddNewOption = () => {
    const updatedFormData = formData.map((question, i) => {
      if (i === questionIndex) {
        return {
          ...question,
          optionsList: [
            ...question.optionsList,
            { text: "", image: { public_id: "", url: "" }, checked: false },
          ],
        };
      }
      return question;
    });
    setFormData(updatedFormData);
  };

  const handleUpdateOptoin = (optIndex, value) => {
    const updatedFormData = formData.map((question, i) => {
      if (i === questionIndex) {
        const updatedOptions = [...question.optionsList];
        updatedOptions[optIndex] = {
          ...updatedOptions[optIndex],
          text: value,
        };
        return {
          ...question,
          optionsList: updatedOptions,
        };
      }
      return question;
    });

    setFormData(updatedFormData);
  };

  const handleDeleteOption = (optIndex) => {
    const updatedFormData = [...formData];
    updatedFormData[questionIndex] = {
      ...updatedFormData[questionIndex],
      optionsList: updatedFormData[questionIndex].optionsList.filter(
        (_, i) => i !== optIndex
      ),
    };

    setFormData(updatedFormData);
  };

  return (
    <div>
      {formData[questionIndex]?.optionsList.map((option, optIndex) => {
        return (
          <div key={optIndex} className="mb-2">
            <div className="flex items-center space-x-2 mb-1">
              <input
                type={formData[questionIndex]?.qtype.value}
                name="option"
                id="option"
                disabled
                className="w-5 h-5"
              />
              <input
                type="text"
                name="option"
                id="option"
                value={option.text}
                placeholder={`Option ${optIndex}`}
                onChange={(e) => handleUpdateOptoin(optIndex, e.target.value)}
                className="outline-none w-full border-b border-b-white hover:border-b-gray-200  focus:border-b-primary duration-200 pb-[2px]"
              />
              <div>
                <button
                  onClick={() => {
                    setModal(true);
                    setOptionIndex(optIndex);
                  }}
                  className="cursor-pointer bg-gray-50 hover:bg-gray-100 duration-150 p-2 rounded-full flex justify-center items-center "
                >
                  <BiImageAdd size={20} className="text-gray-500" />
                </button>
              </div>
              <button
                onClick={() => handleDeleteOption(optIndex)}
                className={`cursor-pointer p-1 hover:bg-gray-100 rounded-full ${
                  formData[questionIndex]?.optionsList.length <= 1 && "hidden"
                } `}
              >
                <MdClose size={25} className="text-gray-500" />
              </button>
            </div>
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

      {modal && (
        <ImageUploadModal
          setModal={setModal}
          questionIndex={questionIndex}
          formData={formData}
          setFormData={setFormData}
          optionIndex={optionIndex}
        />
      )}

      <button
        onClick={handleAddNewOption}
        className="px-3 py-[3px] text-[10px] border border-primary rounded-full flex items-center mb-6"
      >
        <AiOutlinePlus size={14} className="font-medium" />
        &nbsp;Add Options
      </button>
    </div>
  );
}
