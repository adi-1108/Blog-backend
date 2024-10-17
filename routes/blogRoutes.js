const express = require("express");
const {
  createBlogs,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
} = require("../controller/blogController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.use(validateToken);
router.route("/blogs").post(createBlogs).get(getBlogs);
router.route("/blogs/:id").get(getBlog).put(updateBlog).delete(deleteBlog);

module.exports = router;
