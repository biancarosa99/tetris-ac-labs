import React from "react";
import useDarkMode from "../hooks/useDarkMode";

const Navbar = () => {
  const [colorTheme, setTheme] = useDarkMode();

  return (
    <div className="fixed top-0 bg-inherit w-full">
      <span
        onClick={() => setTheme(colorTheme)}
        className="absolute w-6 h-6 my-1 right-5 md:w-12 md:h-6 bg-yellow-500 block rounded-full shadow-lg cursor-pointer text-white flex items-center justify-center dark:bg-indigo-500/100"
      >
        {colorTheme === "light" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </span>
    </div>
  );
};

export default Navbar;
