import React from "react";

function Point(props) {
  const descriptionObject = props.pointDesc.find(
    (x) => x.pointTitle === props.point
  );
  return (
    <div>
      <div className="point-title">{props.point}</div>
      <div className="point-desc">{descriptionObject.text}</div>
    </div>
  );
}

export default Point;
