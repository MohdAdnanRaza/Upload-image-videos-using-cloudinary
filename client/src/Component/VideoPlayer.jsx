import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const VideoPlayer = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/videos/${id}`);
        setVideo(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchVideo();
  }, [id]);

  if (!video) return <div>Loading...</div>;

  return (
    <div>
      <h2>{video.title}</h2>
      <video src={video.videoUrl} controls autoPlay width="600" />
      <p>{video.description}</p>
    </div>
  );
};

export default VideoPlayer;
