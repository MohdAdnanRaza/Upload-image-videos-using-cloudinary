import React, { useState } from "react";
import axios from "axios";
const UploadForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("thumbnail", thumbnail);
    formData.append("video", video);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(res.data.message);
    } catch (error) {
      console.error(error);
      alert("Failed to upload");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength="50"
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength="200"
          required
        ></textarea>
      </div>
      <div>
        <label>Upload Thumbnail (JPG/PNG):</label>
        <input
          type="file"
          accept="image/jpg,image/png"
          onChange={(e) => setThumbnail(e.target.files[0])}
          required
        />
      </div>
      <div>
        <label>Upload Video (MPG/AVI/MP4):</label>
        <input
          type="file"
          accept="video/mpg,video/avi,video/mp4"
          onChange={(e) => setVideo(e.target.files[0])}
          required
        />
      </div>
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;
