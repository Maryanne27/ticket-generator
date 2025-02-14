import React from "react";

const buttonTypes = {
  back: {
    label: "Back",
    className:
      "w-full mx-auto p-3 text-[#24A0B5] border border-[#24A0B5]/50 rounded-lg flex items-center justify-center font-jeju ",
  },
  next: {
    label: "Next",
    className:
      "w-full mx-auto mt-3 sm:mt-0 p-3 bg-[#24A0B5] text-gray50 rounded-lg font-jeju",
  },
  cancel: {
    label: "Cancel",
    className:
      "w-full mx-auto p-3 text-[#24A0B5] border border-[#24A0B5]/50 rounded-lg flex items-center justify-center font-jeju",
  },
  freeTicket: {
    label: "Get My Free Ticket",
    className:
      "w-full mx-auto mt-3 sm:mt-0 p-3 bg-[#24A0B5] text-gray50 rounded-lg font-jeju",
  },
  bookAnother: {
    label: "Book Another Ticket",
    className:
      "w-full mx-auto p-3 text-[#24A0B5] border border-[#24A0B5]/50 rounded-lg flex items-center justify-center ",
  },
  download: {
    label: "Download Ticket",
    className:
      "w-full mx-auto mt-3 sm:mt-0 p-3 bg-[#24A0B5] text-gray50 rounded-lg font-jeju",
  },
};

const Button = ({ type, onClick, className = "", isLoading }) => {
  const button = buttonTypes[type] || buttonTypes["next"];

  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 w-full rounded-lg transition flex items-center justify-center whitespace-nowrap font-jeju${button.className} ${className}`}
      disabled={isLoading} // Disable button when loading
    >
      {isLoading ? "Loading..." : button.label}
    </button>
  );
};

export default Button;
