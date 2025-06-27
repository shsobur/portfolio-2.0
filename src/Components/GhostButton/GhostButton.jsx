// File path__
import "./GhostButton.css";

// From react__
import React, { useState } from "react";

// Simple Ghost Button with variant support
const GhostButton = ({
  variant = "demonic", // 'demonic' or 'spectral'
  children = "Enter if you dare",
  onClick,
  className = "",
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const getVariantClass = () => {
    switch (variant) {
      case "demonic":
        return "ghost-button-demonic";
      case "spectral":
        return "ghost-button-spectral";
      default:
        return "";
    }
  };

  return (
    <button
      className={`ghost-button ${getVariantClass()} ${
        isPressed ? "pressed" : ""
      } ${className}`}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onClick={ onClick}
      {...props}
    >
      <span className="ghost-icon">{variant === "demonic" ? "👹" : "🌙"}</span>
      <span className="button-text">{children}</span>
    </button>
  );
};

export default GhostButton;
