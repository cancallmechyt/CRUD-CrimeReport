const express = require('express');
const router = express.Router();

const { getPost, getPosts, getPostID, getCategory, getformuserIdCat, addPost, addPostTest,  getPostEdit, UpdatePost, deletePost} = require("../cons/post.js");

router.get("/incident/", getPosts);
router.get("/incident/user/:userId", getPost);
router.get("/incident/:Post_id", getPostID);
router.get("/incident/edit/:Post_id", getPostEdit);
router.get("/category/:category", getCategory)
router.get("/category/:category?userId=:userId", getformuserIdCat)
router.post("/incident/", addPost);
router.post("/incident/test/", addPostTest);
router.put("/incident/:Post_id", UpdatePost);
router.delete("/post/:Post_id", deletePost);

module.exports = router;