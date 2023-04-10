const express = require("express");
const router = express.Router();
const xss = require("xss");
const data = require('../data');
const companyData = data.company;
const helper = require('../helper');
const { ObjectId } = require("mongodb");

router
  .route("/")
  .get(async (req, res) => {
    try {
        // let id = req.session.id;        
        let id = "643485c32aa19be61c88787b" //temp id. In the future it'll be taken from the session/token/redis whatever we decide.
        id = helper.common.isValidId(id);
        const data = await companyData.getCompanyDataById(id);
        res.json(data);
    } catch (e) {
      if (typeof e !== "object" || !("status" in e)) {
        console.log(e);
        res.status(500).json("Internal server error");
      } else {
        res.status(parseInt(e.status)).json(e.error);
      }
    }
  })
  .put(async (req, res) => {
    try {
    } catch (e) {
      if (typeof e !== "object" || !("status" in e)) {
        res.status(500).json("Internal server error");
      } else {
        res.status(parseInt(e.status)).json(e.error);
      }
    }
  });

module.exports = router;