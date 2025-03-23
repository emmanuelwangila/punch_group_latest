const express = require("express");

const Post = require("../Models/Post");

const router = express.Router();

router.post("/api/posts", async (req, res) => {
  try {
    const { title, author, content } = req.body;
    const post = new Post({ title, author, content });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: "Server error for posting" });
  }
});

router.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Server error fetching the posts" });
  }
});
