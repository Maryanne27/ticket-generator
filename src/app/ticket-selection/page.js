"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Button from "../component/Button";
import Steps from "../component/Steps";
import { Road_Rage } from "next/font/google";

const roadRage = Road_Rage({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export default function Page() {
  const router = useRouter();
  const [selectedTicket, setSelectedTicket] = useState("REGULAR ACCESS");
  const [selectedCount, setSelectedCount] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const tickets = [
    { type: "REGULAR ACCESS", price: "Free" },
    { type: "VIP ACCESS", price: "$150" },
    { type: "VVIP ACCESS", price: "$150" },
  ];

  const handleNext = () => {
    if (!selectedTicket || !selectedCount) {
      setError("Please select a ticket type and quantity before proceeding.");
      setTimeout(() => setError(""), 3000);
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      router.push("/attendee-form");
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative z-10 p-6 border border-bgBlue rounded-lg shadow-lg"
    >
      <Steps title="Ticket Selection" step="1" progress="50%" />
      <div className="border border-bgBlue rounded-lg p-4 bg-[#08252B] md:w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[radial-gradient(103.64%_57.39%_at_14%_32%,rgba(36,160,181,0.2)_0%,rgba(36,160,181,0)_100%)] p-6 rounded-lg border border-[#07373F] backdrop-blur-md"
        >
          <h3
            className={`${roadRage.className} text-2xl md:text-6xl font-bold text-center whitespace-nowrap text-white`}
          >
            Techember Fest <span className="text-white">"25"</span>
          </h3>
          <p className="text-center mt-2 text-xs md:text-base md:w-[340px] mx-auto">
            Join us for an unforgettable experience at [Event Name]. Secure your
            spot now.
          </p>
          <p className="text-center text-gray50 mt-2 text-xs md:text-base">
            📍 Eko Hotel || March 15, 2025 | 7:00 PM
          </p>
        </motion.div>
        <div className="bg-[#07373F] h-px border-0 my-4"></div>

        {/* Ticket Type */}
        <div className="mt-6">
          <h3 className="text-[#FAFAFA] text-lg">Select Ticket Type:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-3">
            {tickets.map(({ type, price }, index) => (
              <motion.div
                key={index}
                onClick={() => {
                  setSelectedTicket(type);
                  setError("");
                }}
                whileTap={{ scale: 0.95 }}
                className={`cursor-pointer p-4 rounded-xl border ${
                  selectedTicket === type
                    ? "bg-[#12464E] border-[#197686]"
                    : "bg-[#1a3a40] border-gray-600"
                }`}
              >
                <span className="font-semibold text-lg">{price}</span>
                <p className="text-[#FAFAFA] text-sm my-1">{type}</p>
                <p className="text-gray50 text-xs">20/52</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Ticket Quantity */}
        <div className="mt-6">
          <h3 className="text-[#FAFAFA] text-lg">Number of Tickets</h3>
          <div className="relative w-full mt-2">
            <select
              className="w-full p-3 bg-[#1a3a40] rounded-xl border border-[#197686] appearance-none"
              value={selectedCount}
              onChange={(e) => {
                setSelectedCount(e.target.value);
                setError("");
              }}
            >
              <option value="" disabled>
                Select tickets
              </option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option className="bg-[#112126]" key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="absolute top-1/2 right-4 w-5 h-5 text-white transform -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-500 text-white text-sm rounded-lg">
            {error}
          </div>
        )}

        <div className="text-center mt-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <Button
              type="cancel"
              onClick={() => {
                setSelectedTicket("");
                setSelectedCount("");
                setError("");
              }}
            />
            <Button
              type="next"
              onClick={handleNext}
              isLoading={isLoading}
              className={` rounded-lg text-white  transition ${
                isLoading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-[#197686] hover:bg-[#12464E] active:scale-95"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
