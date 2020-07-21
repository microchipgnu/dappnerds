import React from "react";

const JumboCard = props => {
  return (
    <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
      <div className="card h-100">
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default JumboCard;
