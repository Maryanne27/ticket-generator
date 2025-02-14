"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Road_Rage } from "next/font/google";

const roadRage = Road_Rage({
subsets: ["latin"],
weight: "400",
display: "swap",
});

export default function Home() {
const router = useRouter();
const [timeLeft, setTimeLeft] = useState({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
});

useEffect(() => {
  const eventDate = new Date();
  eventDate.setDate(eventDate.getDate() + 6);

  const interval = setInterval(() => {
    const now = new Date();
    const difference = eventDate - now;
    if (difference <= 0) {
      clearInterval(interval);
    } else {
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }
  }, 1000);

  return () => clearInterval(interval);
}, []);

return (
  <div className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden bg-gradient-to-br from-[#012024] via-[#02343F] to-[#045D64] pt-8 mt-10">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-teal-400 opacity-20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-cyan-500 opacity-20 blur-2xl rotate-45"></div>
      <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-blue-500 opacity-15 blur-3xl -rotate-45"></div>
    </div>

    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="text-center px-6 z-10"
    >
      <h1
        className={`${roadRage.className} text-6xl font-extrabold tracking-widel`}
      >
        TECHEMBER Event 2025
      </h1>
      <p className="text-lg mt-3 text-gray-300 max-w-2xl mx-auto">
        Join us for an unforgettable experience filled with music, networking,
        and entertainment.
      </p>
    </motion.div>

    {/* Countdown Timer */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="mt-8 flex gap-4 text-center text-2xl"
    >
      {Object.entries(timeLeft).map(([unit, value], index) => (
        <div
          key={index}
          className="bg-white/10 p-4 rounded-lg w-20 shadow-lg backdrop-blur-md"
        >
          <span className="font-bold text-lg">{value}</span>
          <p className="text-xs text-gray50">{unit.toUpperCase()}</p>
        </div>
      ))}
    </motion.div>

    <motion.button
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5 }}
      onClick={() => router.push("/ticket-selection")}
      className="mt-10 px-8 py-3 bg-white/10 text-white text-lg font-semibold rounded-lg shadow-lg backdrop-blur-lg border border-white/20 hover:bg-white/20 transition-transform transform hover:scale-105"
    >
      Get Your Ticket Now
    </motion.button>
  </div>
);
}
