import { useState } from "react";

export function Button({ onClick }) {
  const [value, setValue] = useState(null);

  const handleClick = () => {
    if (!value) {
      setValue((prev) => (prev === "X" ? "O" : "X"));
      onClick?.();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-12 h-12 flex items-center justify-center border border-gray-400 text-2xl font-bold rounded-md transition duration-200 bg-white hover:bg-gray-100"
    >
      {value}
    </button>
  );
}
