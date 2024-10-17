const asyncHandler = require("express-async-handler");
const Blog = require("../models/blogModel");

// @desc Creats the Blog
// POST /api/blogs/current
// access private
const createBlogs = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { title, content, author } = req.body;
  if (!title || !content || !author) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const blog = await Blog.create({
    title,
    content,
    author,
    user_id: req.user.id,
  });
  res.status(201).json(blog);
});

// @desc Get all the blogs
// GET /api/blogs/
// access private
const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({ user_id: req.user.id });
  res.status(200).json(blogs);
});

const getBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(404);
    throw new Error("Blog Not Found");
  }
  res.status(200).json(blog);
});

const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(404);
    throw new Error("Blog Not Found");
  }

  if (blog.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update the blog");
  }
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedBlog);
});

const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(404);
    throw new Error("Blog Not Found");
  }

  if (blog.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update the blog");
  }

  await Blog.deleteOne({ _id: req.params.id });
  res.status(200).json(blog);
});

module.exports = {
  createBlogs,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
};
