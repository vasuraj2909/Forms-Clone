import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import axios from "axios";

export default function ImageUploadModal({
  setModal,
  questionIndex,
  formData,
  setFormData,
  optionIndex,
}) {
  const [images, setImages] = useState();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  // console.log(optionIndex);

  useEffect(() => {
    async function fetchImages() {
      try {
        const resposne = await axios.get(`${BASE_URL}/image/get`, {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        });

        setImages(resposne.data);
      } catch (error) {
        alert(error.response.data.message);
      }
    }
    fetchImages();
  }, []);

  const onchangeImage = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader(null);

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const image = reader.result;
        try {
          const response = await axios.post(
            `${BASE_URL}/image/upload`,
            { image },
            {
              headers: {
                "auth-token": localStorage.getItem("auth-token"),
              },
            }
          );

          // Realtime change in image grid
          const updatedImages = [...images];
          updatedImages.unshift(response.data);
          setImages(updatedImages);
        } catch (error) {
          alert(error.response.data.message);
        }
      };
    }
  };

  const addImagetoForm = (image) => {
    if (optionIndex === undefined) {
      // Add image to question
      const updatedFormData = [...formData];
      updatedFormData[questionIndex] = {
        ...updatedFormData[questionIndex],
        question: {
          ...updatedFormData[questionIndex].question,
          image: image,
        },
      };
      setFormData(updatedFormData);
    } else {
      // Add image to options
      const updatedFormData = formData.map((question, i) => {
        if (i === questionIndex) {
          const updatedOptions = [...question.optionsList];
          updatedOptions[optionIndex] = {
            ...updatedOptions[optionIndex],
            image: image,
          };
          return {
            ...question,
            optionsList: updatedOptions,
          };
        }
        return question;
      });

      setFormData(updatedFormData);
    }

    setModal(false);
  };

  return (
    <section>
      <div className="fixed z-40 inset-0 bg-black bg-opacity-20 transition-opacity cursor-pointer"></div>
      <div className="fixed bg-white max-w-screen-md mx-auto top-24 left-3 right-3 bottom-10 z-40 overflow-y-auto">
        <div className="flex justify-between items-end p-1">
          <p className="pl-2">Select or UPload Image</p>
          <button
            onClick={() => setModal(false)}
            className="bg-gray-100 hover:bg-gray-200 rounded-full p-1"
          >
            <MdClose size={25} />
          </button>
        </div>
        <hr />
        <div className="p-4">
          <div className="mb-4">
            <input
              type="file"
              id="recipe_image"
              accept="image/*"
              className="cursor-pointer border rounded-md p-1"
              onChange={(event) => onchangeImage(event)}
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
            {images?.map((item) => {
              return (
                <figure
                  key={item._id}
                  className="p-1 aspect-square border rounded-sm cursor-pointer"
                  onClick={() => addImagetoForm(item.image)}
                >
                  <img
                    src={item.image.url}
                    alt=""
                    className="object-contain w-full h-full "
                  />
                </figure>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
