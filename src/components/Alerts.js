import React from "react";

const Alerts = (props) => {
  const capitalize = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  return (
    <div
      style={{
        height: "50px",
      }}
    >
      {props.message && (
        <div
          className={`alert alert-${props.type} alert-dismissible fade show `}
          role="alert"
        >
          <strong>
            {props.type === "danger" ? "Error" : capitalize(props.type)}
          </strong>
          : {props.message}
        </div>
      )}
    </div>
  );
};

export default Alerts;
