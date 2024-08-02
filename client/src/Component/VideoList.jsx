import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const VideoList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/videos");
        setVideos(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div>
      {videos.map((video) => (
        <div key={video._id}>
          <Link to={`/video/${video._id}`}>
            <img src={video.thumbnailUrl} alt={video.title} width="100" />
            <h3>{video.title}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default VideoList;
