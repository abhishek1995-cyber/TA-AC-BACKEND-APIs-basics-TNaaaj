var express = require('express');
var router = express.Router();


var Country = require('../models/country');
var State = require('../models/states');

//create a country

router.post('/', async (req,res)=>{
  try {
    console.log(req.body)
    let country = await Country.create(req.body);
    res.status(202).json(country);
  }catch (err){
    res.json(err);
  }
});

// get all the countries in the ascending/descending order

router.get("/ascending", async (req, res) => {
    try {
        var countryAsc = await Country.aggregate([{ $sort: { name: 1 } }]);
        res.status(202).json(countryAsc);
    } catch (err) {
        res.json(err);
    }
});
router.get("/descending", async (req, res) => {
  try {
      var countryDsc = await Country.aggregate([{ $sort: { name: -1 } }]);
      res.status(202).json(countryDsc);
  } catch (err) {
      res.json(err);
  }
});

// // update a country

router.put('/edit/:id', async (req,res)=>{
  try {
    var id = req.params.id;
    var updatedCountry = await Country.findByIdAndUpdate(id, req.body,{new:true});
    res.status(202).json(updatedCountry);
  } catch (err){
    res.json(err)
  }
});

// delete a coutry document

router.put("/delete/:id", async (req, res) => {
  try {
      var id = req.params.id;
      var deleteCountry = await Country.findByIdAndDelete(id);
      res.status(202).json(deleteCountry);
  } catch (err) {
      res.json(err);
  }
});

// add a state

router.post("/state", async (req, res) => {
  try {
    let countryname = req.body.countryname;
    let country = await Country.findOne({ name: countryname });
    req.body.country = country._id;
    let state = await State.create(req.body);
    let updatedcountry = await Country.findByIdAndUpdate(
      country._id,
      {
        $push: { states: state._id },
      },
      { new: true }
    );
    res.status(202).json(state);
  } catch (err) {
    res.json(err);
  }
});

// list all states for a country in ascending/descending order

router.get("/:countryname/states/ascending", async (req, res) => {
  try {
    let countryname = req.params.countryname;
    console.log(countryname);
    let statesinAscending = await State.aggregate([
      { $match: { countryname: countryname } },
      { $sort: { name: 1 } },
    ]);
    res.status(202).json(statesinAscending);
  } catch (err) {
    res.json(err);
  }
});


router.get("/:countryname/states/decending", async (req, res) => {
  try {
    let countryname = req.params.countryname;
    console.log(countryname);
    let statesinDecending = await State.aggregate([
      { $match: { countryname: countryname } },
      { $sort: { name: -1 } },
    ]);
    res.status(202).json(statesinDecending);
  } catch (err) {
    res.json(err);
  }
});

// list all states in an ascending order of their population

router.get("/:countryname/states/population", async (req, res) => {
  try {
    let countryname = req.params.countryname;
    console.log(countryname);
    let statesinAscending = await State.aggregate([
      { $match: { countryname: countryname } },
      { $sort: { population: 1 } },
    ]);
    res.status(202).json(statesinAscending);
  } catch (err) {
    res.json(err);
  }
});

// countries based on religions.
router.get("/religions", async (req, res) => {
  try {
      let allcountry = await Country.aggregate([
          { $group: { _id: "$ethinicity" } },
      ]);
      res.status(202).json(allcountry);
  } catch (err) {
      res.json(err);
  }
});
// list countries based on continent.
router.get("/continents", async (req, res) => {
  try {
      let allcoutry = await Country.aggregate([
          { $group: { _id: "$continent" } },
      ]);
      res.status(202).json(allcoutry);
  } catch (err) {
      res.json(err);
  }
});
// list countries based on population.
router.get("/population", async (req, res) => {
  try {
      let allcountry = await Country.aggregate([
          { $group: { _id: "$populations" } },
      ]);
      res.status(202).json(allcountry);
  } catch (err) {
      res.json(err);
  }
});

module.exports = router;