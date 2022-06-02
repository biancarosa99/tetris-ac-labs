import React from "react";
import "./styles.css";

export function RightPanel({ children }) {
  return (
    <div className="right-panel flex flex-col space-y-4  border-4 border-pink-500 dark:border-indigo-500/100">
      {children}
    </div>
  );
}
