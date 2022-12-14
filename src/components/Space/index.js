import React from "react";
import "./styles.css"

import { Link } from "react-router-dom";

const SpaceCard = ({ id, title, description, backgroundColor, color }) => {
  return (
    <div className="space-section">
      {" "}
      <div key={id} className="space-items" style={{ backgroundColor, color }}>
        {" "}
        <h2>{title}</h2> <p>{description}</p>
        <div>
        <Link to={`/spaces/${id}`}>
          <button>Visit Space </button>{" "}
        </Link>{" "}
      </div>
      </div>
     
    </div>
  );
};

const StoryCard = ({ id, name, content, imageUrl}) => {
  return (
    <div key={id} className="story-container"  >
      {" "}
      <img src={imageUrl} alt="" />
      <div><h3> {name}</h3> <p> {content} </p></div>
    </div>
  );
};

export { SpaceCard, StoryCard };
