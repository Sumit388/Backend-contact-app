const express = require("express");
const router = express.Router();
const {
  getContacts,
  getSingleContacts,
  updateSingleContacts,
  deleteSingleContacts,
  addNewContact,
} = require("../controllers/contactController");
const validatetoken=require("../middleware/validateTokenHandler");

router.use(validatetoken);

router.route("/").get(getContacts).post(addNewContact);

router
  .route("/:id")
  .get(getSingleContacts)
  .delete(deleteSingleContacts)
  .put(updateSingleContacts);

module.exports = router;
