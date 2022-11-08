var express = require('express');
var router = express.Router();
var Article = require('../models/article');
var Comment = require('../models/comment');

router.get("/", async(req,res,next) => {
    try{
        var article = await Article.find({});
        res.json({article});
        next();
    }catch(error){
        return error;
    }
});

// create article

router.get('/new', async (req, res, next) => {
    try {
        res.status(200).json({ message: 'articleinfo' });
    } catch (error) {
        return error;
    }
    });

router.post('/', async (req, res, next) => {
    try {
        var article = await Article.create(req.body);
        res.status(200).json({ article });
        next();
    } catch (error) {
    return error;
    }
});

//fetching  single article

router.get('/:id', async (req, res, next) => {
    var id = req.params.id;
    try {
        var article = await Article.findById(id);
        res.status(200).json({ article });
        next();
    } catch (error) {
        return error;
    }
});

//update article
router.put('/:id', async (req, res, next) => {
    var id = req.params.id;
    try {
        var update = await Article.findByIdAndUpdate(id, req.body);
        res.status(200).json({ update });
        next();
    } catch (error) {
    return error;
    }
});

//delete
router.delete('/:id/delete', async (req, res, next) => {
    var id = req.params.id;
    try {
        var del = await Article.findByIdAndDelete(id);
        res.status(200).json({ del });
        next();
    } catch (error) {
        return error;
    }
});

//Add Comment
router.post('/:id/comment', async (req, res, next) => {
    var id = req.params.id;
    req.body.articleId = id;
    try {
        var comment = await Comment.create(req.body);
        var article = await Article.findByIdAndUpdate(id, {
        $push: { comment: comment._id },
    });
    res.status(200).json({ comment });
    } catch (error) {
    return error;
    }
});

module.exports = router;