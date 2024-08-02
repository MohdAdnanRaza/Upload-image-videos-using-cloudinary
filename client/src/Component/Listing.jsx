import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Listing = () => {
  const [mediaList, setMediaList] = useState([]);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/media");
        setMediaList(response.data);
      } catch (error) {
        console.error("Error fetching media:", error);
      }
    };

    fetchMedia();
  }, []);

  return (
    <div>
      <h2>Media Listing</h2>
      <ul>
        {mediaList.map((media) => (
          <li key={media._id}>
            <Link to={`/media/$} {...media._id}`}>
              <img
                src={media.imageUrl}
                alt={media.title}
                style={{ width: "100px" }}
              />
            </Link>
            <br />
            <Link to={`/media/$} {...media._id}`}>{media.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Listing;
