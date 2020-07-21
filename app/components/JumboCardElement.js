import React from "react";

const JumboCardElement = ({ title, value }) => {
  return (
    <p className="card-subtitle mb-2 text-muted">
      {title}: <small className="text-muted">{value}</small>
    </p>
  );
};

export default JumboCardElement;
