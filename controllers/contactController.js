const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModels");
//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getContacts = asyncHandler(async (req, res) => {
  const allContacts = await Contact.find();
  res.status(200).json({
    message: "get all contacts",
    count: allContacts.length,
    data: allContacts,
  });
});

//@desc Get individual contacts
//@route GET /api/contacts/:id
//@access public
const getSingleContacts = asyncHandler(async (req, res) => {
  const indContact = await Contact.findById(req.params.id);
  if (!indContact) {
    res.status(404);
    throw new Error("No contacts found");
  }
  res.status(200).json({
    message: `get single contact details for ${req.params.id}`,
    data: indContact,
  });
});

//@desc Update individual contacts
//@route PUT /api/contacts/:id
//@access public
const updateSingleContacts = asyncHandler(async (req, res) => {
  const indContact = await Contact.findById(req.params.id);
  if (!indContact) {
    res.status(404);
    throw new Error("No contacts found");
  }
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json({
    message: `update single contact details for ${req.params.id}`,
    data: updatedContact,
  });
});

//@desc Delete individual contacts
//@route DELETE /api/contacts/:id
//@access public
const deleteSingleContacts = asyncHandler(async (req, res) => {
  const indContact = await Contact.findById(req.params.id);
  if (!indContact) {
    res.status(404);
    throw new Error("No contacts found");
  }
  const deletedContact = await Contact.findByIdAndDelete(req.params.id, {
    new: true,
  });
  res
    .status(200)
    .json({
      message: `delete single contact details for ${req.params.id}`,
      data: deletedContact,
    });
});

//@desc Add new contacts
//@route POST /api/contacts
//@access public
const addNewContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  } else {
    await Contact.create(req.body);
    res.status(200).json({
      message: "add new contact deatils",
    });
  }
});

module.exports = {
  getContacts,
  getSingleContacts,
  updateSingleContacts,
  deleteSingleContacts,
  addNewContact,
};
