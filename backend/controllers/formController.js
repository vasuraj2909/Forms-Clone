import FormModel from "../models/FormModel.js";

// Create new form
const createForm = async (req, res) => {
  const questions = [
    {
      qtype: { value: "radio", label: "Multiple choice" },
      required: false,
      question: {
        text: "Question",
        image: { public_id: "", url: "" },
      },
      optionsList: [
        {
          text: "",
          image: { public_id: "", url: "" },
          checked: false,
        },
      ],
    },
  ];

  try {
    const form = new FormModel({ createdBy: req.user.id, questions });
    await form.save();
    res.status(201).send(form);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

// Get all forms of current user for dashboard
const getForms = async (req, res) => {
  try {
    const forms = await FormModel.find({ createdBy: req.user.id });
    res.status(200).send(forms);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

// Get form by userid and formid
const getFormById = async (req, res) => {
  try {
    const form = await FormModel.find({
      _id: req.params.id,
      createdBy: req.user.id,
    });
    res.status(200).send(form);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

// Get responding form
const getRespondingForm = async (req, res) => {
  try {
    const form = await FormModel.findById(req.params.id);
    res.status(200).send(form);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

// Update form
const editForm = async (req, res) => {
  const { name, description, questions, stared } = req.body;
  try {
    // Find the form to be deleted
    let form = await FormModel.findById(req.params.id);
    // if form not exist
    if (!form) return res.status(401).send({ message: "Form not found" });

    // if user is not owener of this form
    if (form.createdBy.toString() !== req.user.id) {
      return res.status(401).send("You can't Edit this form");
    }

    // Edit form
    form = await FormModel.findByIdAndUpdate(
      req.params.id,
      { name, description, questions, stared },
      { new: true }
    );

    res.status(200).send(form);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

// Delete form
const deleteForm = async (req, res) => {
  try {
    // Find the form to be deleted
    let form = await FormModel.findById(req.params.id);
    // if form not exist
    if (!form) return res.status(401).send({ message: "Form not found" });

    // if user is not owener of this form
    if (form.createdBy.toString() !== req.user.id) {
      return res.status(401).send("You can't delete this form");
    }
    // Delete the form
    form = await FormModel.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

export { createForm, getForms, deleteForm, getFormById, editForm, getRespondingForm };
