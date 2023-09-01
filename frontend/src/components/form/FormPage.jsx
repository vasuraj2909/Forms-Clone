import React, { useState } from "react";
import FormNavbar from "./FormNavbar";
import EditForm from "./EditForm";
import Response from "./Response";

export default function FormPage() {
  const [response, setResponse] = useState(false);

  const [formData, setFormData] = useState([]);
  const [formInfo, setFormInfo] = useState({ name: "", description: "" });

  console.log(response);
  return (
    <div className="min-h-screen bg-secondary">
      <FormNavbar
        response={response}
        setResponse={setResponse}
        formData={formData}
        formInfo={formInfo}
        setFormInfo={setFormInfo}
      />

      <section className="max-w-screen-md mx-auto py-24 px-3">
        {response ? (
          <Response />
        ) : (
          <EditForm
            response={response}
            formData={formData}
            setFormData={setFormData}
            formInfo={formInfo}
            setFormInfo={setFormInfo}
          />
        )}
      </section>
    </div>
  );
}
