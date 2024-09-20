// const multer = require('multer');

// const storage = multer.diskStorage({
//    destination: (req, file,cb) => {
//     let folder = " ";
//     if(file.fieldname === "blog_post"){
//         folder = "uploads/blog_post";
//     }else if(file.fieldname === "van"){
//         folder = "uploads/van";
//     }else{
//         return cb(new Error("Invalid file field name"));
//     }
//     cb(null,folder);
//    },
//    filename: (req,file,cb) => {
//     cb(null, `${Date.now()}_${file.originalname}`);
//    },
// });

// const uploadBlogPost = multer({
//     storage: storage,
//     limits: { fileSize: 10 * 1024 * 1024 },
//     fileFilter: (req, file, cb) => {
//       const filetypes = /png|jpg|jpeg/;
//       const extname = filetypes.test(
//         path.extname(file.originalname).toLowerCase()
//       );
//       const mimetype = filetypes.test(file.mimetype);
//       if (mimetype && extname) {
//         return cb(null, true);
//       } else {
//         cb(new Error("Error: PNG, JPG, and JPEG QR Codes Only!"));
//       }
//     },
// });

// const uploadVan = multer({
//     storage: storage,
//     limits: { fileSize: 10 * 1024 * 1024 },
//     fileFilter: (req, file, cb) => {
//       const filetypes = /png|jpg|jpeg/;
//       const extname = filetypes.test(
//         path.extname(file.originalname).toLowerCase()
//       );
//       const mimetype = filetypes.test(file.mimetype);
//       if (mimetype && extname) {
//         return cb(null, true);
//       } else {
//         cb(new Error("Error: PNG, JPG, and JPEG QR Codes Only!"));
//       }
//     },
// });



// module.exports = {
//     uploadBlogPost,
//     uploadVan,
// };

const multer = require("multer");
const cloudinary = require("../utils/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Storage for modules
const vanStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "van", // Cloudinary folder name for modules
    allowedFormats: ["jpg", "png", "jpeg"],
  },
});

// Storage for trainer images
const blogPostStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "blogPost", // Cloudinary folder name for trainer images
    allowedFormats: ["jpg", "png", "jpeg"],
  },
});

// Middleware for uploading modules
const uploadVan = multer({ storage: vanStorage });

// Middleware for uploading trainer images
const uploadBlogPost = multer({ storage: blogPostStorage });

module.exports = {
    uploadVan,
    uploadBlogPost,
};