import React, { useEffect } from "react";

function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast toast-${type}`}>

      <div className="toast-icon">
        {type === "success" ? "✓" : "!"}
      </div>

      <div className="toast-content">
        <strong>
          {type === "success"
            ? "Success"
            : "Notice"}
        </strong>

        <span>{message}</span>
      </div>

      <button onClick={onClose}>
        ×
      </button>

    </div>
  );
}

export default Toast;