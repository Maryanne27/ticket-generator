"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import user from "../../public/user.png";
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
  <div className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden bg-gradient-to-br from-[#012024] via-[#02343F] to-[#045D64]">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-teal-400 opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-cyan-500 opacity-20 blur-2xl rotate-45"></div>
      <div className="absolute top-0 right-0 w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 bg-blue-500 opacity-15 blur-3xl -rotate-45"></div>
    </div>

    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="mb-6"
    >
      <Image
        src={user}
        alt="User Image"
        width={150}
        height={150}
        className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full object-cover"
      />
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="text-center px-6 z-10"
    >
      <h1
        className={`${roadRage.className}text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-widest`}
      >
        TECHEMBER Event 2025
      </h1>
      <p className="text-base sm:text-lg md:text-xl mt-3 text-gray-300 max-w-2xl mx-auto">
        Join us for an unforgettable experience filled with music, networking,
        and entertainment.
      </p>
    </motion.div>

    {/* Countdown Timer */}
    <motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ delay: 1 }}
className="mt-8 flex flex-wrap justify-center gap-4 text-center text-lg sm:text-xl md:text-2xl"
>
{Object.entries(timeLeft).map(([unit, value], index) => (
  <div
    key={index}
    className="bg-white/10 p-3 sm:p-4 md:p-5 rounded-lg w-16 sm:w-20 md:w-24 shadow-lg backdrop-blur-md"
  >
    <span className="font-bold">{value}</span>
    <p className="text-xs sm:text-sm text-gray-50">{unit.toUpperCase()}</p>
  </div>
))}
</motion.div>

    <motion.button
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5 }}
      onClick={() => router.push("/ticket-selection")}
      className="mt-10 px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-teal-400 to-blue-500 text-white text-base sm:text-lg font-semibold rounded-lg shadow-lg hover:from-teal-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400 transform transition-transform duration-200"
    >
      Get Your Ticket Now
    </motion.button>
  </div>
);
}
