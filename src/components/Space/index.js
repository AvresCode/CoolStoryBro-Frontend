import React from "react";

import { Link } from "react-router-dom";

export default function SpaceCard({
  id,
  title,
  description,
  backgroundColor,
  color,
}) {
  return (
    <div>
      {" "}
      <div key={id} style={{ backgroundColor, color }}>
        {" "}
        <h2>{title}</h2> <p>{description}</p>
      </div>
      <div><Link to={`/spaces/${id}`}> Visit Space</Link> </div>
    </div>
  );
}
