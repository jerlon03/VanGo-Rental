

const uploadController = {
  uploadBlogPost: (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    res.status(200).json({ 
      message: 'Blog post image uploaded successfully',
      file: req.file
    });
  },

  uploadVan: (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    res.status(200).json({ 
      message: 'Van image uploaded successfully',
      file: req.file
    });
  }
};

module.exports = uploadController;