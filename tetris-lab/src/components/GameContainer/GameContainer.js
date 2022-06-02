import React from "react";

export function GameContainer({ children, keyDown }) {
  return (
    <div
      className="container"
      onKeyDown={(e) => keyDown(e)}
      tabIndex="0"
      role="button"
    >
      {children}
    </div>
  );
}
