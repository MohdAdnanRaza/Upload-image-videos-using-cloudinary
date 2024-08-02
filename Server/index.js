const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  thumbnailUrl: String,
  videoUrl: String,
});

const Video = mongoose.model("Video", videoSchema);

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up Multer for file uploads
const storage = multer.diskStorage({});
const upload = multer({ storage });

// API endpoints
app.post(
  "/api/upload",
  upload.fields([{ name: "thumbnail" }, { name: "video" }]),
  async (req, res) => {
    try {
      const { title, description } = req.body;

      // Upload thumbnail to Cloudinary
      const thumbnailResult = await cloudinary.uploader.upload(
        req.files.thumbnail[0].path,
        {
          resource_type: "image",
        }
      );

      // Upload video to Cloudinary
      const videoResult = await cloudinary.uploader.upload(
        req.files.video[0].path,
        {
          resource_type: "video",
        }
      );

      // Save to MongoDB
      const video = new Video({
        title,
        description,
        thumbnailUrl: thumbnailResult.secure_url,
        videoUrl: videoResult.secure_url,
      });

      await video.save();

      res.status(200).json({ message: "Upload successful!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to upload files" });
    }
  }
);

app.get("/api/videos", async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
