const multer = require("multer");
const cloudinary = require("../utils/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Storage for modules
const vanStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "van", 
    allowedFormats: ["jpg", "png", "jpeg"],
  },
});

// Ensure the storage for blog posts is set up correctly
const blogPostStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "blog",
    allowedFormats: ["jpg", "png", "jpeg"],
  },
});

// Middleware for uploading modules
const uploadVan = multer({ storage: vanStorage });

// Middleware for uploading blog post images
const uploadBlogPost = multer({ storage: blogPostStorage });

module.exports = {
    uploadVan,
    uploadBlogPost,
};
