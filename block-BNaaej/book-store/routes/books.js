var express = require('express');
var router = express.Router();
var Book = require('../models/book')

//list all the books
router.get("/", async (req, res) => {
    try {
      let books = await Book.find({});
      res.status(200).json(books);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // to Create a book
  router.post("/", async (req, res) => {
    try {
      let book = await Book.create(req.body);
      res.status(200).json({ book });
    } catch (err) {
      res.status(500).json(err);
    }
    
  //update a book 
  router.put("/:id", async (req, res) => {
    try {
      let id = req.params.id;
      console.log(req.body);
      let book = await Book.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(book);
    } catch (err) {
      res.status(500).json(err);
    }
  });

 //delete a book
 
      router.put("/delete/:id", async (req, res) => {
        try {
          let id = req.params.id;
          let book = await Book.findByIdAndDelete(id);
          res.status(200).json(book);
        } catch (err) {
          res.status(500).json(err);
        }
      });
    });



module.exports = router